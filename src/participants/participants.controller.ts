import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { ParticipantsService } from './participants.service';
import { CreateParticipantsDto } from './dto/create-participant.dto';
import { GetParticipantsDto } from './dto/get-participant-info.dto';
import { CompleteParticipantsDto } from './dto/complete-participants.dto';
import { CreateParticipantResponseDto } from './dto/create-participant-response.dto';

@ApiTags('Participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @ApiOperation({ summary: '참가자 생성 및 모임 참여' })
  @ApiOkResponse({ type: CreateParticipantResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  @Post()
  async createParticipant(
    @Body() dto: CreateParticipantsDto,
  ): Promise<CreateParticipantResponseDto> {
    const participant = await this.participantsService.setParticipant(dto);
    return {
      id: participant.id,
    };
  }

  @ApiOperation({ summary: '참가자 정보 조회' })
  @ApiParam({ name: 'participantId', example: 'participant-id' })
  @ApiOkResponse({ type: GetParticipantsDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Get(':participantId')
  async getParticipantInfo(
    @Param('participantId') participantId: string,
  ): Promise<GetParticipantsDto> {
    return await this.participantsService.getParticipantsInfo(participantId);
  }

  @ApiOperation({ summary: '참가자 설문 완료 처리' })
  @ApiParam({ name: 'participantId', example: 'participant-id' })
  @ApiOkResponse({ type: CompleteParticipantsDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
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
