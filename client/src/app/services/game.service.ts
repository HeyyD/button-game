import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Action } from '../models/Actions';
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

  onEmit(): Observable<number> {
    return new Observable<number>(observer => {
      this.socket.on('click', (data: number) => observer.next(data));
    });
  }

  click(): void {
    this.socket.emit(Action.CLICK);
  }
}
