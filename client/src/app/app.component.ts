import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { ModalState } from './models/ModalStates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  username = '';
  showModal = true;
  modalState = ModalState.USER;

  clicks: number;

  constructor(private gameService: GameService) {
    this.gameService.onClick().subscribe((clicks: number) => {
      this.clicks = clicks;
    });

    this.gameService.onPrize().subscribe((prize: any) => {
      this.modalState = ModalState.WIN;
      this.showModal = true;
    });
  }

  onClick(): void {
    this.gameService.click();
  }

  onUsernameChange(username: string): void {
    this.username = username;
  }
}
