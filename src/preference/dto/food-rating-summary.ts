import { ApiProperty } from '@nestjs/swagger';
import { FoodRatingCountsDto } from './food-rating-counts.dto';

export class FoodRatingSummaryDto {
  @ApiProperty({ example: 'food-id' })
  foodId: string;

  @ApiProperty({ example: '파스타' })
  foodName: string;

  @ApiProperty({ type: FoodRatingCountsDto })
  ratings: FoodRatingCountsDto;
}
