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

  async findByCode(code: string): Promise<Room | null> {
    return this.roomRepository.findOne({ where: { code } });
  }

  private generateCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async getRoomStatus(code: string) {
    const room = await this.roomRepository.findOne({
      where: { code },
      relations: ['participants'],
    });

    if (!room) {
      throw new NotFoundException(`Room with code ${code} not found`);
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
}
