import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

export class GameServer {

  public static readonly PORT: number = 8080;

  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  private score = 0;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIo(this.server)

    this.port = process.env.PORT || GameServer.PORT;

    this.init();
  }

  getApp(): express.Application {
    return this.app;
  }

  private init(): void {
    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });

    this.io.on('connect', (socket: any) => {
      console.log(`Connected client on port ${this.port}`);

      socket.on('click', () => {
        this.score++;

        if (this.score % 500 === 0) {
          socket.emit('prize', 'YOU WON A GRAND PRIZE!!!!!!');
        } else if (this.score % 200 === 0) {
          socket.emit('prize', 'YOU WON A MEDIUM PRIZE!!!');
        } else if (this.score % 100 === 0) {
          socket.emit('prize', 'YOU WON A PRIZE!');
        }

        socket.emit('click', this.clicksToPrize());
        console.log(`SCORE: ${this.score}`);
      })
    })
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
