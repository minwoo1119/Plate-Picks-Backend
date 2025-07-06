import { Controller, Param, Sse, MessageEvent } from '@nestjs/common';
import { SseService } from './sse.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse(':roomId')
  sendEvents(@Param('roomId') roomId: string): Observable<MessageEvent> {
    return this.sseService.subscribe(roomId).pipe(
      map((data) => ({
        data,
      })) as any,
    );
  }
}
