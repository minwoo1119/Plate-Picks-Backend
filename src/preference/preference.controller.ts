import { Controller, Get } from '@nestjs/common';

import { FoodRatingSummaryDto } from './dto/food-rating-summary';
import { PreferenceService } from './preference.service';

@Controller('preferences')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Get()
  async getAllReview(): Promise<FoodRatingSummaryDto[]> {
    return await this.preferenceService.getReviewSummary();
  }
}
