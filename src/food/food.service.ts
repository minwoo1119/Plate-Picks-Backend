import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { Repository } from 'typeorm';
import { FoodReviewDto } from './dto/food-review.dto';
import { Preference } from 'src/preference/preference.entity';
import {
  RecommendFoodDto,
  RecommendedFoodResponseDto,
} from './dto/recommend-food.dto';

export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
  ) {}

  async getFoods(): Promise<Food[]> {
    return this.foodRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getRecommendedFoods(
    dto: RecommendFoodDto,
  ): Promise<RecommendedFoodResponseDto[]> {
    const foods = await this.foodRepository.find();
    const excludedCategories = new Set<string>(dto.excludedCategories ?? []);
    const preferredCategories = new Set<string>(dto.preferredCategories ?? []);
    const limit = dto.limit ?? 10;

    const scoredFoods = foods
      .filter((food) => !excludedCategories.has(food.category))
      .map((food) => {
        let score = 0;
        const reasons: string[] = [];

        if (dto.mealTime && food.mealTimes.includes(dto.mealTime)) {
          score += 4;
          reasons.push(`${this.getMealTimeLabel(dto.mealTime)}에 잘 맞습니다.`);
        }

        if (dto.diningMode === 'delivery' && food.deliveryFriendly) {
          score += 3;
          reasons.push('배달로 먹기 좋은 메뉴입니다.');
        }

        if (dto.diningMode === 'dine-in' && food.shareable) {
          score += 1;
          reasons.push('매장에서 함께 먹기 좋은 메뉴입니다.');
        }

        if (dto.maxBudget !== undefined) {
          if (food.maxBudget <= dto.maxBudget) {
            score += 4;
            reasons.push('예산 범위 안에서 선택하기 좋습니다.');
          } else if (food.minBudget <= dto.maxBudget) {
            score += 1;
          } else {
            score -= 4;
          }
        }

        if (dto.spicePreference !== undefined) {
          const distance = Math.abs(food.spiceLevel - dto.spicePreference);
          score += Math.max(0, 3 - distance);
          if (distance <= 1) {
            reasons.push('선호하는 매운맛 강도와 가깝습니다.');
          }
        }

        if (dto.quickMealPreferred === true && food.quickMeal) {
          score += 3;
          reasons.push('빠르게 먹기 좋은 메뉴입니다.');
        }

        if (dto.quickMealPreferred === false && !food.quickMeal) {
          score += 1;
        }

        if (dto.shareablePreferred === true && food.shareable) {
          score += 3;
          reasons.push('여럿이 나눠 먹기 좋습니다.');
        }

        if (dto.shareablePreferred === false && !food.shareable) {
          score += 1;
        }

        if (preferredCategories.size > 0 && preferredCategories.has(food.category)) {
          score += 5;
          reasons.push('선호 카테고리에 포함됩니다.');
        }

        return {
          food,
          score,
          reason:
            reasons[0] ??
            '입력한 조건과 무난하게 잘 맞는 후보입니다.',
        };
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        if (a.food.maxBudget !== b.food.maxBudget) {
          return a.food.maxBudget - b.food.maxBudget;
        }

        return a.food.name.localeCompare(b.food.name, 'ko');
      });

    return scoredFoods.slice(0, limit).map(({ food, reason }) => ({
      id: food.id,
      name: food.name,
      description: food.description,
      imgUrl: food.imageUrl,
      category: food.category,
      mealTimes: food.mealTimes,
      minBudget: food.minBudget,
      maxBudget: food.maxBudget,
      spiceLevel: food.spiceLevel,
      quickMeal: food.quickMeal,
      shareable: food.shareable,
      deliveryFriendly: food.deliveryFriendly,
      reason,
    }));
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

  private getMealTimeLabel(mealTime: string): string {
    switch (mealTime) {
      case 'breakfast':
        return '아침';
      case 'lunch':
        return '점심';
      case 'dinner':
        return '저녁';
      case 'late-night':
        return '야식';
      default:
        return '식사 시간';
    }
  }
}
