import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from './preference.entity';
import { Repository } from 'typeorm';
import { FoodRatingSummaryDto } from './dto/food-rating-summary';

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
}
