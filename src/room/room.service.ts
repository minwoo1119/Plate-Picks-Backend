import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { NotFoundException } from '@nestjs/common';

export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create({
      ...createRoomDto,
      code: this.generateCode(),
    });
    return this.roomRepository.save(room);
  }

  async findById(id: string): Promise<Room | null> {
    return this.roomRepository.findOne({ where: { id } });
  }

  private generateCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async getRoomStatus(id: string) {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['participants'],
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    const total = room.total_participants;
    const joined = room.participants.length;
    const completed = room.participants.filter((p) => p.completed).length;

    return {
      total_participants: total,
      joined_participants: joined,
      completed_participants: completed,
      all_completed: total === joined && total === completed,
    };
  }

  async getRoomParticipants(id: string) {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['participants'],
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    return room.participants.map((participant) => ({
      id: participant.id,
      name: participant.name,
      completed: participant.completed,
      joined_at: participant.joined_at,
    }));
  }
}
