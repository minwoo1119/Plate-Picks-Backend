import { ApiProperty } from '@nestjs/swagger';

export class ResultFoodDto {
  @ApiProperty({ example: 'food-id' })
  id: string;

  @ApiProperty({ example: '피자' })
  name: string;

  @ApiProperty({ example: '모든 참가자의 취향을 고려한 추천 메뉴' })
  description: string;

  @ApiProperty({ example: 'https://cdn.platepicks.pics/foods/pizza.jpg' })
  imgUrl: string;
}
