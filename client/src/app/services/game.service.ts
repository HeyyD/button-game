import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

import GameDTO from '../dto/GameDTO';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = '//localhost:8080/';
  private socket: any;

  constructor(private http: HttpClient) {
    this.socket = socketIo(this.api);
  }

  getGames(): Observable<GameDTO[]> {
    return this.http.get<GameDTO[]>(this.api);
  }
}
