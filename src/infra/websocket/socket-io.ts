import { Server, Socket } from 'socket.io';
import { WebsocketEventsEnum } from 'src/data/enums';
import { WebsocketInterface } from 'src/data/protocols/websocket';

export class SocketIoAdapter implements WebsocketInterface {
  socketServer: Server;

  constructor() {
    const sv = new Server();
    this.socketServer = sv;

    this.socketServer.listen(parseInt(process.env.WEBSOCKET_PORT));
    this.socketServer.on('connection', this.connection);
  }

  emitEvent<T>(event: WebsocketEventsEnum, data: T): void {
    this.socketServer.emit(event, data);
  }

  listenEvent<T>(event: WebsocketEventsEnum, listener: (arg: T) => void): void {
    this.socketServer.on(event, listener);
  }

  private connection(socket: Socket) {
    const token = socket.request.headers.authorization;
    console.log('connection');
  }

  private disconnect() {
    console.log('disconnected');
  }
}
