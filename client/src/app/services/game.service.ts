import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import GameDTO from '../dto/GameDTO';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = '//localhost:8080/';

  constructor(private http: HttpClient) { }

  getGames(): Observable<GameDTO[]> {
    return this.http.get<GameDTO[]>(this.api);
  }
}
