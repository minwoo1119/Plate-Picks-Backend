import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomResponseDto {
  @ApiProperty({ example: 'room-id' })
  id: string;

  @ApiProperty({ example: 'AB12CD' })
  code: string;
}
