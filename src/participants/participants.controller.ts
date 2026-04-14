import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantsDto } from './dto/create-participant.dto';
import { GetParticipantsDto } from './dto/get-participant-info.dto';
import { CompleteParticipantsDto } from './dto/complete-participants.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  async createParticipant(
    @Body() dto: CreateParticipantsDto,
  ): Promise<{ id: string }> {
    const participant = await this.participantsService.setParticipant(dto);
    return {
      id: participant.id,
    };
  }

  @Get(':participantId')
  async getParticipantInfo(
    @Param('participantId') participantId: string,
  ): Promise<GetParticipantsDto> {
    const participantInfo =
      await this.participantsService.getParticipantsInfo(participantId);
    if (!participantInfo) {
      throw new NotFoundException('Participant not found');
    }
    return participantInfo;
  }

  @Get('complete/:participantId')
  async completeParticipants(
    @Param('participantId') participantId: string,
  ): Promise<CompleteParticipantsDto> {
    await this.participantsService.completeParticipant(participantId);
    return {
      success: true,
    };
  }
}
