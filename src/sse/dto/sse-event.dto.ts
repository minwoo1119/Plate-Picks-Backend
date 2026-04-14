import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ParticipantSummaryDto } from 'src/participants/dto/participant-summary.dto';

export class SseEventDto {
  @ApiProperty({ example: 'participant-joined' })
  type: string;

  @ApiPropertyOptional({ example: 'participant-id' })
  participantId?: string;

  @ApiPropertyOptional({ example: '민우' })
  participantName?: string;

  @ApiPropertyOptional({ type: ParticipantSummaryDto, isArray: true })
  participants?: ParticipantSummaryDto[];
}
