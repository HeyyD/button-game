import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Action } from '../models/Actions';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = '//localhost:8080/';
  private socket: any;

  constructor() {
    this.socket = socketIo(this.api);
  }

  click(): void {
    this.socket.emit(Action.CLICK);
  }
}
