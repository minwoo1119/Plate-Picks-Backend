import { IsString } from 'class-validator';

export class FoodReviewDto {
  @IsString()
  participantId: string;
  @IsString()
  foodId: string;
  rating: 'Good' | 'Soso' | 'Bad';
}
