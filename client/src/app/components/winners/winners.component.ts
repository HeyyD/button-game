import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  winners: string[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getWinners().subscribe(res => {
      this.winners = res;
      console.log(this.winners);
    });
  }

}
