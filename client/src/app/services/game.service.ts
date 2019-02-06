import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Action, SocketAction, SocketEvent } from '../models/Actions';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WinData } from '../models/WinData';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = '//localhost:8080/';
  private socket: any;

  constructor(private http: HttpClient) {
    this.socket = socketIo(this.api);
  }

  onClick(): Observable<number> {
    return new Observable<number>(observer => {
      this.socket.on(SocketAction.CLICK, (data: number) => observer.next(data));
    });
  }

  onPrize(): Observable<WinData> {
    return new Observable<WinData>(observer => {
      this.socket.on(SocketAction.PRIZE, (data: WinData) => observer.next(data));
    });
  }

  onEvent(event: SocketEvent): Observable<SocketEvent> {
    return new Observable<SocketEvent>(observer => {
      this.socket.on(event, (data: any) => observer.next(data));
    });
  }

  click(): void {
    this.socket.emit(Action.CLICK);
  }

  saveWinner(username: string): void {
    this.socket.emit(Action.SAVE_WINNER, username);
  }

  getWinners(): Observable<string[]> {
    return this.http.get<string[]>(this.api + 'api/winners');
  }
}
