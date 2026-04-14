import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { FoodReviewDto } from './dto/food-review.dto';
import { FoodResponseDto } from './dto/food-response.dto';
import {
  RecommendFoodDto,
  RecommendedFoodResponseDto,
} from './dto/recommend-food.dto';
import { FoodService } from './food.service';

@ApiTags('Foods')
@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiOperation({ summary: '음식 목록 조회' })
  @ApiOkResponse({
    type: FoodResponseDto,
    isArray: true,
  })
  @Get()
  async getFoods() {
    const foods = await this.foodService.getFoods();
    return foods.map((food) => ({
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
    }));
  }

  @ApiOperation({ summary: '상황 기반 추천 후보 음식 조회' })
  @ApiOkResponse({
    type: RecommendedFoodResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Post('recommendations')
  async getRecommendedFoods(
    @Body() dto: RecommendFoodDto,
  ): Promise<RecommendedFoodResponseDto[]> {
    return this.foodService.getRecommendedFoods(dto);
  }

  @ApiOperation({ summary: '개별 음식 선호도 저장 또는 수정' })
  @ApiCreatedResponse({
    type: SuccessResponseDto,
    description: '선호도 저장 성공',
  })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Post()
  async postFoodReview(@Body() foodReview: FoodReviewDto) {
    await this.foodService.postFoodReview(foodReview);
    return { success: true };
  }
}
