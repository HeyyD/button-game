import { createServer, Server } from 'http';
import * as express from 'express';
// import * as socketIo from 'socket.io';

export class GameServer {

  public static readonly PORT: number = 8080;

  private app: express.Application;
  private server: Server;
  private port: string | number;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.port = process.env.PORT || GameServer.PORT;

    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });
  }

  getApp(): express.Application {
    return this.app;
  }
}
