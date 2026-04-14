import { ApiProperty } from '@nestjs/swagger';

export class ParticipantSummaryDto {
  @ApiProperty({ example: 'participant-id' })
  id: string;

  @ApiProperty({ example: '민우' })
  name: string;

  @ApiProperty({ example: true })
  completed: boolean;

  @ApiProperty({ example: '2026-04-14T12:00:00.000Z' })
  joined_at: Date;
}
