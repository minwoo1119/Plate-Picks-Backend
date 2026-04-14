import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantResponseDto {
  @ApiProperty({ example: 'participant-id' })
  id: string;
}
