import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { WinModel } from 'src/app/models/WinModel';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  @Output() click = new EventEmitter<void>();
  winners: WinModel[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getWinners().subscribe(res => {
      this.winners = res;
    });

    this.gameService.onWinnersUpdate().subscribe((data: WinModel[]) => {
      this.winners = data;
    });
  }

}
