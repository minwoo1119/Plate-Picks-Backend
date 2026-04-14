import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { FoodRatingSummaryDto } from './dto/food-rating-summary';
import { PreferenceService } from './preference.service';
import { ResultFoodDto } from './dto/result-food.dto';
import { SubmitPreferenceDto } from './dto/create-preference.dto';

@ApiTags('Preferences')
@Controller('preferences')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @ApiOperation({ summary: '음식별 선호도 요약 조회' })
  @ApiOkResponse({ type: FoodRatingSummaryDto, isArray: true })
  @Get()
  async getAllReview(): Promise<FoodRatingSummaryDto[]> {
    return await this.preferenceService.getReviewSummary();
  }

  @ApiOperation({ summary: '최종 추천 메뉴 조회' })
  @ApiParam({ name: 'roomId', example: 'room-id' })
  @ApiOkResponse({ type: ResultFoodDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Get('result/:roomId')
  async getResultMenu(@Param('roomId') roomId: string): Promise<ResultFoodDto> {
    return await this.preferenceService.getResultMenu(roomId);
  }

  @ApiOperation({ summary: '선호도 일괄 제출' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Post('submit')
  async submitPreferences(@Body() dto: SubmitPreferenceDto) {
    await this.preferenceService.savePreferences(dto);
    return { success: true };
  }
}
