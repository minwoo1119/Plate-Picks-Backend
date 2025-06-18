import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { Repository } from 'typeorm';
import { FoodReviewDto } from './dto/food-review.dto';
import { Preference } from 'src/preference/preference.entity';

export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
  ) {}

  async getFoods(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  async postFoodReview(foodReview: FoodReviewDto): Promise<Preference> {
    const existing = await this.preferenceRepository.findOne({
      where: {
        participant: { id: foodReview.participantId },
        food: { id: foodReview.foodId },
      },
    });

    if (existing) {
      existing.rating = foodReview.rating;
      existing.responsed_at = new Date();
      return this.preferenceRepository.save(existing);
    } else {
      return this.preferenceRepository.save({
        participant: { id: foodReview.participantId },
        food: { id: foodReview.foodId },
        rating: foodReview.rating,
        responsed_at: new Date(),
      });
    }
  }
}
