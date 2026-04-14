import { ApiProperty } from '@nestjs/swagger';

export class FoodResponseDto {
  @ApiProperty({
    example: 'food-id',
    description: '음식 식별자',
  })
  id: string;

  @ApiProperty({
    example: '파스타',
    description: '음식 이름',
  })
  name: string;

  @ApiProperty({
    example: '크림 베이스 파스타',
    description: '음식 설명',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'https://cdn.platepicks.pics/foods/pasta.jpg',
    description: '음식 이미지 URL',
    nullable: true,
  })
  imgUrl: string;

  @ApiProperty({
    example: 'western',
    description: '추천에 활용되는 음식 카테고리',
  })
  category: string;

  @ApiProperty({
    example: ['lunch', 'dinner'],
    description: '권장 식사 시간대',
    isArray: true,
  })
  mealTimes: string[];

  @ApiProperty({
    example: 9000,
    description: '권장 최소 예산',
  })
  minBudget: number;

  @ApiProperty({
    example: 15000,
    description: '권장 최대 예산',
  })
  maxBudget: number;

  @ApiProperty({
    example: 1,
    description: '매운맛 정도. 0은 안 매움, 3은 매우 매움',
  })
  spiceLevel: number;

  @ApiProperty({
    example: true,
    description: '빠르게 먹기 좋은 메뉴인지 여부',
  })
  quickMeal: boolean;

  @ApiProperty({
    example: false,
    description: '여럿이 나눠 먹기 좋은 메뉴인지 여부',
  })
  shareable: boolean;

  @ApiProperty({
    example: true,
    description: '배달 적합 여부',
  })
  deliveryFriendly: boolean;
}
