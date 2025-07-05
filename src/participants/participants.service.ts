import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from './participants.entity';
import { Repository } from 'typeorm';
import { CreateParticipantsDto } from './dto/create-participant.dto';
import { Room } from 'src/room/room.entity';
import { GetParticipantsDto } from './dto/get-participant-info.dto';
import { completeParticipantsDto } from './dto/complete-participants.dto';

export class ParticipantsService {
  constructor(
    @InjectRepository(Participants)
    private readonly participantsRepository: Repository<Participants>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async setParticipant(dto: CreateParticipantsDto): Promise<Participants> {
    const room = await this.roomRepository.findOne({
      where: { code: dto.roomCode },
    });

    if (!room) {
      throw new Error('Room Not Fount');
    }

    const participant = this.participantsRepository.create({
      name: dto.name,
      room: room,
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
      throw new Error('Participant Not Found');
    }

    return {
      participantId: participant.id,
      name: participant.name,
      completed: participant.completed,
    };
  }

  async completeParticipant(
    participantId: string,
  ): Promise<completeParticipantsDto> {
    const participant = await this.participantsRepository.findOneBy({
      id: participantId,
    });

    if (!participant) {
      throw new Error('No participants found');
    }

    participant.completed = true;
    await this.participantsRepository.save(participant);

    return {
      participantId: participant.id,
      completed: participant.completed,
    };
  }
}
