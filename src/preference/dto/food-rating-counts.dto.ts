import { ApiProperty } from '@nestjs/swagger';

export class FoodRatingCountsDto {
  @ApiProperty({ example: 2 })
  Good: number;

  @ApiProperty({ example: 1 })
  Soso: number;

  @ApiProperty({ example: 0 })
  Bad: number;
}
