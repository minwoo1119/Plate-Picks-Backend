import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from './preference.entity';
import { Repository } from 'typeorm';
import { FoodRatingSummaryDto } from './dto/food-rating-summary';
import { ResultFoodDto } from './dto/result-food.dto';
import { Food } from 'src/food/food.entity';
import { SubmitPreferenceDto } from './dto/create-preference.dto';
import { NotFoundException } from '@nestjs/common';
import { Participants } from 'src/participants/participants.entity';

export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(Participants)
    private readonly participantRepository: Repository<Participants>,
  ) {}

  async getReviewSummary(): Promise<FoodRatingSummaryDto[]> {
    const preferences = await this.preferenceRepository.find({
      relations: ['food'],
    });

    const grouped = new Map<string, FoodRatingSummaryDto>();

    for (const pref of preferences) {
      const foodId = pref.food.id;
      if (!grouped.has(foodId)) {
        grouped.set(foodId, {
          foodId,
          foodName: pref.food.name,
          ratings: { Good: 0, Soso: 0, Bad: 0 },
        });
      }

      grouped.get(foodId)!.ratings[pref.rating]++;
    }

    return Array.from(grouped.values());
  }

  async getResultMenu(roomId: string): Promise<ResultFoodDto> {
    const preferences = await this.preferenceRepository
      .createQueryBuilder('preference')
      .leftJoinAndSelect('preference.food', 'food')
      .leftJoin('preference.participant', 'participant')
      .leftJoin('participant.room', 'room')
      .where('room.id = :roomId', { roomId })
      .getMany();

    const scoreMap = new Map<
      string,
      { food: Food; score: number; good: number; soso: number; bad: number }
    >();

    for (const pref of preferences) {
      const foodId = pref.food.id;
      const existing = scoreMap.get(foodId) ?? {
        food: pref.food,
        score: 0,
        good: 0,
        soso: 0,
        bad: 0,
      };

      const delta =
        pref.rating === 'Good' ? 2 : pref.rating === 'Soso' ? 0 : -3;

      existing.score += delta;
      if (pref.rating === 'Good') existing.good += 1;
      if (pref.rating === 'Soso') existing.soso += 1;
      if (pref.rating === 'Bad') existing.bad += 1;

      scoreMap.set(foodId, {
        ...existing,
      });
    }

    const sorted = Array.from(scoreMap.values())
      .map((item) => {
        let adjustedScore = item.score;

        if (item.bad === 0) adjustedScore += 2;
        if (item.good >= 2) adjustedScore += 1;

        return {
          ...item,
          adjustedScore,
        };
      })
      .sort((a, b) => {
        if (b.adjustedScore !== a.adjustedScore) {
          return b.adjustedScore - a.adjustedScore;
        }

        if (a.bad !== b.bad) {
          return a.bad - b.bad;
        }

        if (b.good !== a.good) {
          return b.good - a.good;
        }

        return a.food.name.localeCompare(b.food.name, 'ko');
      });

    if (sorted.length === 0) {
      throw new NotFoundException('No preferences found');
    }

    const bestFood = sorted[0].food;

    return {
      id: bestFood.id,
      name: bestFood.name,
      description: bestFood.description,
      imgUrl: bestFood.imageUrl,
    };
  }

  async savePreferences(dto: SubmitPreferenceDto) {
    const participant = await this.participantRepository.findOne({
      where: { id: dto.participantId },
    });
    if (!participant) throw new NotFoundException('Participant not found');

    for (const item of dto.preferences) {
      const food = await this.foodRepository.findOne({
        where: { id: item.foodId },
      });
      if (!food) {
        throw new NotFoundException(`Food not found: ${item.foodId}`);
      }

      const existing = await this.preferenceRepository.findOne({
        where: {
          participant: { id: participant.id },
          food: { id: food.id },
        },
      });

      if (existing) {
        existing.rating = item.preference;
        await this.preferenceRepository.save(existing);
        continue;
      }

      await this.preferenceRepository.save(
        this.preferenceRepository.create({
          participant,
          food,
          rating: item.preference,
        }),
      );
    }
  }
}
