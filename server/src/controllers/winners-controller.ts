import * as express from 'express';

import { WinModel, WinDbModel } from '../models/win-model';

export class WinnersController {
  private winners: WinModel[] = [];
  private router = express.Router();

  constructor() {
    this.router.get('/', (req: express.Request , res: express.Response) => {
      res.send(this.winners);
    });
  }

  getRouter(): express.Router {
    return this.router;
  }

  getWinners(): WinModel[] {
    return this.winners;
  }

  saveWinner(data: WinModel) {
    this.winners.push(data);
    let winner = new WinDbModel(data);
    winner.save().then(() => {
      console.log(`${data.username} saved to database`)
    }).catch((error: any) => {
      console.log(error);
    });
  }

  initWinners(): void {
    WinDbModel.find({}, (error: any, res: WinModel[]) => {
      res.forEach(doc => {
        this.winners.push(doc);
      })
    })
  }
}
