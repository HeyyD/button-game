import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import GameDTO from './dto/GameDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  games: GameDTO[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // this.gameService.getGames().subscribe(res => this.games = res);
  }

  isReady(): boolean {
    return !!this.games;
  }
}
