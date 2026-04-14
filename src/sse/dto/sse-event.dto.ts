import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SseEventDto {
  @ApiProperty({ example: 'participant-completed' })
  type: string;

  @ApiPropertyOptional({ example: 'participant-id' })
  participantId?: string;
}
