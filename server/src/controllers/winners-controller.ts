import * as express from 'express';
import { WinModel } from '../models/win-model';

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
  }
}
