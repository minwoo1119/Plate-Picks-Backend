import { Controller, Get, Param } from '@nestjs/common';

import { FoodRatingSummaryDto } from './dto/food-rating-summary';
import { PreferenceService } from './preference.service';
import { ResultFoodDto } from './dto/result-food.dto';

@Controller('preferences')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Get()
  async getAllReview(): Promise<FoodRatingSummaryDto[]> {
    return await this.preferenceService.getReviewSummary();
  }

  @Get('result/:roomId')
  async getResultMenu(@Param('roomId') roomId: string): Promise<ResultFoodDto> {
    return await this.preferenceService.getResultMenu(roomId);
  }
}
