import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { WinModel } from 'src/app/models/WinModel';
import Subscriber from 'src/app/models/Subscriber';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent extends Subscriber implements OnInit {

  @Output() closeModal = new EventEmitter<void>();
  winners: WinModel[];

  constructor(private gameService: GameService) {
    super();
   }

  ngOnInit() {
    this.addSubscriptions([
      this.gameService.getWinners().subscribe(res => {
        this.winners = res;
      }),
      this.gameService.onWinnersUpdate().subscribe((data: WinModel[]) => {
        this.winners = data;
      })
    ]);
  }
}
