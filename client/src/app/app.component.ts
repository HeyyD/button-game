import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private gameService: GameService) {
    this.gameService.onEmit().subscribe((score: number) => {
      console.log(`current score is ${score}`);
    });
  }

  onClick(): void {
    this.gameService.click();
  }
}
