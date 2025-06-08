import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<{ code: string }> {
    const room = await this.roomService.createRoom(createRoomDto);
    return { code: room.code };
  }

  @Get(':code')
  async getRoom(@Param('code') code: string): Promise<Room | null> {
    return this.roomService.findByCode(code);
  }

  @Get(':code/status')
  async getRoomStatus(@Param('code') code: string) {
    return this.roomService.getRoomStatus(code);
  }
}
