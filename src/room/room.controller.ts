import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { ParticipantSummaryDto } from 'src/participants/dto/participant-summary.dto';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';
import { CreateRoomResponseDto } from './dto/create-room-response.dto';
import { RoomDetailDto } from './dto/room-detail.dto';
import { RoomStatusDto } from './dto/room-status.dto';

@ApiTags('Rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: '모임 생성' })
  @ApiCreatedResponse({ type: CreateRoomResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Post()
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<CreateRoomResponseDto> {
    const room = await this.roomService.createRoom(createRoomDto);
    return { id: room.id, code: room.code };
  }

  @ApiOperation({ summary: '모임 단건 조회' })
  @ApiParam({ name: 'id', example: 'room-id' })
  @ApiOkResponse({ type: RoomDetailDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Get(':id')
  async getRoom(@Param('id') id: string): Promise<Room | null> {
    return this.roomService.findById(id);
  }

  @ApiOperation({ summary: '모임 상태 조회' })
  @ApiParam({ name: 'roomId', example: 'room-id' })
  @ApiOkResponse({ type: RoomStatusDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Get(':roomId/status')
  async getRoomStatus(@Param('roomId') roomId: string) {
    return this.roomService.getRoomStatus(roomId);
  }

  @ApiOperation({ summary: '참가자 목록 조회' })
  @ApiParam({ name: 'roomId', example: 'room-id' })
  @ApiOkResponse({ type: ParticipantSummaryDto, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Get('participants/:roomId')
  async getAllParticipants(@Param('roomId') roomId: string) {
    return this.roomService.getRoomParticipants(roomId);
  }
}
