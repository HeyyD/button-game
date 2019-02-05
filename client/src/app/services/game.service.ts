import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Action, SocketAction, SocketEvent } from '../models/Actions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = '//localhost:8080/';
  private socket: any;

  constructor() {
    this.socket = socketIo(this.api);
  }

  onClick(): Observable<number> {
    return new Observable<number>(observer => {
      this.socket.on(SocketAction.CLICK, (data: number) => observer.next(data));
    });
  }

  onPrize(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on(SocketAction.PRIZE, (data: string) => observer.next(data));
    });
  }

  onEvent(event: SocketEvent): Observable<SocketEvent> {
    return new Observable<SocketEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  click(): void {
    this.socket.emit(Action.CLICK);
  }
}
