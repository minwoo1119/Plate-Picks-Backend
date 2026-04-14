import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

const FOOD_CATEGORIES = [
  'korean',
  'chinese',
  'japanese',
  'western',
  'fastfood',
  'asian',
  'meat',
] as const;

const MEAL_TIMES = ['breakfast', 'lunch', 'dinner', 'late-night'] as const;
const DINING_MODES = ['dine-in', 'delivery'] as const;

export class RecommendFoodDto {
  @ApiPropertyOptional({ enum: MEAL_TIMES, example: 'lunch' })
  @IsOptional()
  @IsIn(MEAL_TIMES)
  mealTime?: (typeof MEAL_TIMES)[number];

  @ApiPropertyOptional({ enum: DINING_MODES, example: 'delivery' })
  @IsOptional()
  @IsIn(DINING_MODES)
  diningMode?: (typeof DINING_MODES)[number];

  @ApiPropertyOptional({ example: 15000, description: '1인 예산 상한' })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxBudget?: number;

  @ApiPropertyOptional({
    example: 1,
    description: '선호 매운맛 정도. 0은 안 매움, 3은 매우 매움',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(3)
  spicePreference?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  quickMealPreferred?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  shareablePreferred?: boolean;

  @ApiPropertyOptional({ enum: FOOD_CATEGORIES, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsIn(FOOD_CATEGORIES, { each: true })
  preferredCategories?: (typeof FOOD_CATEGORIES)[number][];

  @ApiPropertyOptional({ enum: FOOD_CATEGORIES, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsIn(FOOD_CATEGORIES, { each: true })
  excludedCategories?: (typeof FOOD_CATEGORIES)[number][];

  @ApiPropertyOptional({
    example: 10,
    description: '반환할 후보 개수. 8~12를 권장',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  limit?: number;
}

export class RecommendedFoodResponseDto {
  @ApiProperty({ example: 'food-id' })
  id: string;

  @ApiProperty({ example: '쌀국수' })
  name: string;

  @ApiPropertyOptional({ example: '가볍고 빠르게 먹기 좋은 국물 면 요리' })
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.platepicks.pics/foods/noodle.jpg' })
  imgUrl?: string;

  @ApiProperty({ example: 'asian' })
  category: string;

  @ApiProperty({ example: ['lunch', 'dinner'], isArray: true })
  mealTimes: string[];

  @ApiProperty({ example: 9000 })
  minBudget: number;

  @ApiProperty({ example: 13000 })
  maxBudget: number;

  @ApiProperty({ example: 1 })
  spiceLevel: number;

  @ApiProperty({ example: true })
  quickMeal: boolean;

  @ApiProperty({ example: false })
  shareable: boolean;

  @ApiProperty({ example: true })
  deliveryFriendly: boolean;

  @ApiProperty({
    example:
      '점심 시간대와 빠른 식사 조건에 잘 맞고, 예산 범위 안에서 선택하기 쉬운 메뉴입니다.',
  })
  reason: string;
}
