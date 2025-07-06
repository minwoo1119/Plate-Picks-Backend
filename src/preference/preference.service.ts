import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from './preference.entity';
import { Repository } from 'typeorm';
import { FoodRatingSummaryDto } from './dto/food-rating-summary';
import { ResultFoodDto } from './dto/result-food.dto';
import { Food } from 'src/food/food.entity';

export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
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

    const scoreMap = new Map<string, { food: Food; score: number }>();

    for (const pref of preferences) {
      const foodId = pref.food.id;
      const currentScore = scoreMap.get(foodId)?.score ?? 0;
      const delta =
        pref.rating === 'Good' ? 2 : pref.rating === 'Soso' ? 0 : -1;

      scoreMap.set(foodId, {
        food: pref.food,
        score: currentScore + delta,
      });
    }

    const sorted = Array.from(scoreMap.values()).sort(
      (a, b) => b.score - a.score,
    );

    const topTwo = sorted.slice(0, 2);

    if (topTwo.length === 0) throw new Error('No preferences found');

    const randomTop = topTwo[Math.floor(Math.random() * topTwo.length)].food;

    return {
      id: randomTop.id,
      name: randomTop.name,
      description: randomTop.description,
      imgUrl: randomTop.imageUrl,
    };
  }
}
