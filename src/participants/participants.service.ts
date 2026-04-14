import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from './participants.entity';
import { Repository } from 'typeorm';
import { CreateParticipantsDto } from './dto/create-participant.dto';
import { JoinByCodeDto } from './dto/join-by-code.dto';
import { Room } from 'src/room/room.entity';
import { GetParticipantsDto } from './dto/get-participant-info.dto';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { SseService } from 'src/sse/sse.service';

export class ParticipantsService {
  constructor(
    @InjectRepository(Participants)
    private readonly participantsRepository: Repository<Participants>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    private readonly sseService: SseService,
  ) {}

  async setParticipant(dto: CreateParticipantsDto): Promise<Participants> {
    const room = await this.roomRepository.findOne({
      where: { id: dto.roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return this.createParticipant(room, dto.name);
  }

  async joinParticipantByCode(dto: JoinByCodeDto): Promise<Participants> {
    const room = await this.roomRepository.findOne({
      where: { code: dto.code },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return this.createParticipant(room, dto.name);
  }

  private async createParticipant(
    room: Room,
    name: string,
  ): Promise<Participants> {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new BadRequestException('Name is required');
    }

    const count = await this.participantsRepository.count({
      where: { room: { id: room.id } },
    });

    if (count >= room.total_participants) {
      throw new BadRequestException('이미 가득 찬 방입니다.');
    }

    const participant = this.participantsRepository.create({
      name: normalizedName,
      room,
    });

    return this.participantsRepository.save(participant);
  }

  async getParticipantsInfo(
    participantId: string,
  ): Promise<GetParticipantsDto> {
    const participant = await this.participantsRepository.findOne({
      where: { id: participantId },
    });

    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    return {
      id: participant.id,
      name: participant.name,
      completed: participant.completed,
    };
  }

  async completeParticipant(participantId: string): Promise<void> {
    const participant = await this.participantsRepository.findOne({
      where: { id: participantId },
      relations: ['room'],
    });

    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    if (participant.completed) {
      throw new ConflictException('Participant already completed');
    }

    participant.completed = true;
    await this.participantsRepository.save(participant);

    const roomId = participant.room.id;
    this.sseService.notify(roomId, {
      type: 'participant-completed',
      participantId: participant.id,
    });
  }
}
