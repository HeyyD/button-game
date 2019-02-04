import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  score: number;

  constructor(private gameService: GameService) {
    this.gameService.onClick().subscribe((score: number) => {
      this.score = score;
    });
  }

  onClick(): void {
    this.gameService.click();
  }
}
