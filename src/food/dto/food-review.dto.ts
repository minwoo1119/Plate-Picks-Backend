import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FoodReviewDto {
  @ApiProperty({ example: 'participant-id' })
  @IsString()
  participantId: string;

  @ApiProperty({ example: 'food-id' })
  @IsString()
  foodId: string;

  @ApiProperty({
    example: 'Good',
    enum: ['Good', 'Soso', 'Bad'],
  })
  rating: 'Good' | 'Soso' | 'Bad';
}
