import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import { WinData } from './models/win-data';
import { WinModel } from './models/win-model';
import { WinnersController } from './controllers/winners-controller';

export class GameServer {

  public static readonly PORT: number = 8080;

  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private winnersController: WinnersController;

  private score = 0;

  private dbUri = 'mongodb://dbuser:dbpassword123@ds059722.mlab.com:59722/button-game'

  constructor() {
    this.app = express();
    this.init();
  }

  getApp(): express.Application {
    return this.app;
  }

  private init(): void {
    this.app.use(cors());

    // init routes
    this.winnersController = new WinnersController();
    this.app.use('/api/winners', this.winnersController.getRouter());

    this.server = createServer(this.app);
    this.io = socketIo(this.server)

    this.port = process.env.PORT || GameServer.PORT;

    mongoose.connect(this.dbUri, { useNewUrlParser: true }).then(() => {
      console.log('CONNECTED TO DATABASE');
      this.winnersController.initWinners();
      this.startServer();
    }).catch((error: Error) => {
      console.log('Something went wrong when connecting to database');
      console.log(error);
      this.startServer();
    });
  }

  private startServer(): void {
    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });

    this.io.on('connect', (socket: any) => {
      console.log(`Connected client on port ${this.port}`);

      socket.on('click', () => {
        this.score++;

        if (this.score % 500 === 0) {
          socket.emit('prize', {score: this.score, prize: 'huge prize'});
        } else if (this.score % 200 === 0) {
          socket.emit('prize', {score: this.score, prize: 'medium prize'});
        } else if (this.score % 100 === 0) {
          socket.emit('prize', {score: this.score, prize: 'small prize'});
        }

        socket.emit('click', this.clicksToPrize());
      });

      socket.on('save-winner', (data: WinModel) => {
        this.winnersController.saveWinner(data);
        this.io.emit('winner-update', this.winnersController.getWinners());
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    this.server.on('close', () => {
      mongoose.connection.close();
    });
  }

  private clicksToPrize(): number {
    let currentScore = this.score;
    let neededClicks = 0;
    
    while(currentScore % 100 !== 0) {
      currentScore++;
      neededClicks++;
    }
    return neededClicks;
  }
}
