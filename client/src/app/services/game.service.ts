import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Action, SocketAction } from '../models/Actions';
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

  onPrize(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(SocketAction.PRIZE, (data: any) => observer.next(data));
    });
  }

  click(): void {
    this.socket.emit(Action.CLICK);
  }
}
