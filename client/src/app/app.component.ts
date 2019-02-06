import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { ModalState } from './models/ModalStates';
import { SocketEvent } from './models/Actions';
import { WinData } from './models/WinData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  username = '';
  showModal = true;

  modalState = ModalState.LOADING;

  clicks: number;
  winData: WinData;

  constructor(private gameService: GameService) {
    this.gameService.onClick().subscribe((clicks: number) => {
      this.clicks = clicks;
    });

    this.gameService.onPrize().subscribe((data: WinData) => {
      this.modalState = ModalState.WIN;
      this.winData = data;
      this.showModal = true;
      this.gameService.saveWinner({username: this.username, data: data});
    });

    this.gameService.onEvent(SocketEvent.CONNECT).subscribe(() => {
      console.log('connected to server');
      this.modalState = ModalState.USER;

    this.gameService.onEvent(SocketEvent.DISCONNECT).subscribe(() => {
      console.log('disconnected');
    });
  }

  onClick(): void {
    this.gameService.click();
  }

  onUsernameChange(username: string): void {
    this.username = username;
  }
}
