import { ApiProperty } from '@nestjs/swagger';

export class RoomDetailDto {
  @ApiProperty({ example: 'room-id' })
  id: string;

  @ApiProperty({ example: 'AB12CD' })
  code: string;

  @ApiProperty({ example: 4 })
  total_participants: number;

  @ApiProperty({ example: '2026-04-14T12:00:00.000Z' })
  created_at: Date;
}
