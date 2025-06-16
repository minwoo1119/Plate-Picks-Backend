import { Controller, Get } from '@nestjs/common';

import { FoodService } from './food.service';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
  @Get()
  async getFoods() {
    const foods = await this.foodService.getFoods();
    return foods;
  }
}
