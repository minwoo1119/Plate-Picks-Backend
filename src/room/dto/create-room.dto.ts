import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: 4,
    description: '모임 총 참가 인원',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  total_participants: number;
}
