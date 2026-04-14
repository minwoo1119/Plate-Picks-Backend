import { ApiProperty } from '@nestjs/swagger';

export class RoomStatusDto {
  @ApiProperty({ example: 4 })
  total_participants: number;

  @ApiProperty({ example: 3 })
  joined_participants: number;

  @ApiProperty({ example: 2 })
  completed_participants: number;

  @ApiProperty({ example: false })
  all_completed: boolean;
}
