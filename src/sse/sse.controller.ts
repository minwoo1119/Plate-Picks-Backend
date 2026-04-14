import { Controller, Param, Sse, MessageEvent } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { SseService } from './sse.service';
import { SseEventDto } from './dto/sse-event.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@ApiTags('SSE')
@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @ApiOperation({ summary: '실시간 진행 상태 SSE 구독' })
  @ApiParam({ name: 'roomId', example: 'room-id' })
  @ApiProduces('text/event-stream')
  @ApiOkResponse({
    description: 'SSE stream. 각 이벤트의 data는 진행 상태 변경 정보를 담습니다.',
    type: SseEventDto,
  })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @Sse(':roomId')
  sendEvents(@Param('roomId') roomId: string): Observable<MessageEvent> {
    return this.sseService.subscribe(roomId).pipe(
      map((data) => ({
        data,
      })) as any,
    );
  }
}
