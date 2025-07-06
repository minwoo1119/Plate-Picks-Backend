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
  ): Promise<{ id: string; code: string }> {
    const room = await this.roomService.createRoom(createRoomDto);
    return { id: room.id, code: room.code };
  }

  @Get(':id')
  async getRoom(@Param('id') id: string): Promise<Room | null> {
    return this.roomService.findById(id);
  }

  @Get(':id/status')
  async getRoomStatus(@Param('id') id: string) {
    return this.roomService.getRoomStatus(id);
  }

  @Get('participants/:id')
  async getAllParticipants(@Param('id') id: string) {
    return this.roomService.getRoomParticipants(id);
  }
}
