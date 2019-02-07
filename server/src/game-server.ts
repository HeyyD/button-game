import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as cors from 'cors';
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

  constructor() {
    this.app = express();
    this.app.use(cors());

    // init routes
    this.winnersController = new WinnersController();
    this.app.use('/api/winners', this.winnersController.getRouter());

    this.server = createServer(this.app);
    this.io = socketIo(this.server)

    this.port = process.env.PORT || GameServer.PORT;

    this.startServer();
  }

  getApp(): express.Application {
    return this.app;
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
          socket.emit('prize', new WinData(this.score, 'huge prize'));
        } else if (this.score % 200 === 0) {
          socket.emit('prize', new WinData(this.score, 'medium prize'));
        } else if (this.score % 100 === 0) {
          socket.emit('prize', new WinData(this.score, 'small prize'));
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
