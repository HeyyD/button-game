import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  clicks: number;

  constructor(private gameService: GameService) {
    this.gameService.onClick().subscribe((clicks: number) => {
      this.clicks = clicks;
    });
  }

  onClick(): void {
    this.gameService.click();
  }
}
