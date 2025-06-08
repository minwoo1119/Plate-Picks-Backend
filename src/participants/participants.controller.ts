import { Body, Post } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantsDto } from './dto/create-participant.dto';
import { Controller } from '@nestjs/common';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  async createParticipant(@Body() dto: CreateParticipantsDto) {
    const participant = await this.participantsService.setParticipant(dto);
    return {
      id: participant.id,
      name: participant.name,
      joinedAt: participant.joined_at,
    };
  }
}
