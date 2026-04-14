import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantResponseDto {
  @ApiProperty({ example: 'participant-id' })
  id: string;

  @ApiProperty({ example: 'room-id' })
  roomId: string;

  @ApiProperty({ example: '민우' })
  name: string;
}
