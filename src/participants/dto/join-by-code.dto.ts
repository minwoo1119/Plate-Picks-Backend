import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinByCodeDto {
  @ApiProperty({
    example: '민우',
    description: '참가자 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'AB12CD',
    description: '사용자 공유용 초대 코드',
  })
  @IsString()
  code: string;
}
