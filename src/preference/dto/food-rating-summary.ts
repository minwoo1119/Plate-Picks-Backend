export class FoodRatingSummaryDto {
  foodId: string;
  foodName: string;
  ratings: {
    Good: number;
    Soso: number;
    Bad: number;
  };
}
