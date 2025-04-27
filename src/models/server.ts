import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import cors from 'cors';
import adminRouter from '../routers/admin/admin-router';
import herosRouter from '../routers/heros/heros-router';
import citezenRouter from '../routers/citezen/citezen-router';
import tiposRouter from '../routers/tipos/tipos-router';
import placesRouter from '../routers/places/places-router';
import infoRouter from '../routers/info/info-router';
import sereneRouter from '../routers/serene/serene-router';
import seedRouter from '../routers/seed-router';
import Sockets from './sockets';

class Server {
  private app: express.Application;
  private port: string | number;
  private server: http.Server;
  private io: SocketIOServer;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = http.createServer(this.app);
    this.io = new SocketIOServer(this.server, {});
  }

  private middlewares(): void {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors());
    this.app.use(express.json());

     this.app.use('/kanrisha', adminRouter);
     this.app.use('/no-roguin-to-toroku', herosRouter);
     this.app.use('/shimin', citezenRouter);
     this.app.use('/otoko', tiposRouter);
     this.app.use('/basho', placesRouter);
     this.app.use('/joho', infoRouter);
     this.app.use('/odayakana', sereneRouter);
     this.app.use('/seed', seedRouter);
  }

  private configurarSockets(): void {
    new Sockets(this.io);
  }

  public execute(): void {
    if (!this.port) {
      throw new Error('El puerto no está definido');
    }

    this.middlewares();
    this.configurarSockets();

    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto: ${this.port}`);
    });
  }
}

export default Server;
