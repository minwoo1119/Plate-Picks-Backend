import { Observable, Subject } from 'rxjs';

import { Injectable } from '@nestjs/common';

@Injectable()
export class SseService {
  private emitters: Map<string, Subject<any>> = new Map();

  subscribe(roomId: string): Observable<any> {
    let subject = this.emitters.get(roomId);

    if (!subject) {
      subject = new Subject<any>();
      this.emitters.set(roomId, subject);
    }

    return subject.asObservable();
  }

  notify(roomId: string, payload: any) {
    const subject = this.emitters.get(roomId);
    if (subject) {
      subject.next(payload);
    }
  }
}
