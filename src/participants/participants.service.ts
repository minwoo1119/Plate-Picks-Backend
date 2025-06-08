import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from './participants.entity';
import { Repository } from 'typeorm';
import { CreateParticipantsDto } from './dto/create-participant.dto';
import { Room } from 'src/room/room.entity';

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
}
