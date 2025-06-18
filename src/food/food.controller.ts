import { Body, Controller, Get, Post } from '@nestjs/common';

import { FoodReviewDto } from './dto/food-review.dto';
import { FoodService } from './food.service';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
  @Get()
  async getFoods() {
    const foods = await this.foodService.getFoods();
    return foods;
  }

  @Post()
  async postFoodReview(@Body() foodReview: FoodReviewDto) {
    return this.foodService.postFoodReview(foodReview);
  }
}
