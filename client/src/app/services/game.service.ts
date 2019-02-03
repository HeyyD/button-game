import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = '//localhost:8080/';

  constructor(private http: HttpClient) { }

  test(): void {
    this.http.get(this.api, {responseType: 'text'}).subscribe(res => console.log(res));
  }

  getGames(): Observable<any> {
    return this.http.get<any>(this.api);
  }
}
