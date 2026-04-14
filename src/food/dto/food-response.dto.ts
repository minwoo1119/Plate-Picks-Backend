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
}
