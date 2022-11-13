import { Server, Socket } from 'socket.io';
import { WebsocketEventsEnum } from 'src/data/enums';
import { Decrypter } from 'src/data/protocols/cryptography';
import { WebsocketInterface } from 'src/data/protocols/websocket';
import { JwtAdapter } from '../cryptography/jwt-adapter';

export class SocketIoAdapter implements WebsocketInterface {
  private socketServer: Server;
  private decrypter: Decrypter = new JwtAdapter(process.env.SECRET);

  constructor() {
    const sv = new Server();
    this.socketServer = sv;

    this.socketServer.listen(parseInt(process.env.WEBSOCKET_PORT));
    this.socketServer.on('connection', this.connection.bind(this));
  }

  emitEvent<T>(event: WebsocketEventsEnum, data: T): void {
    this.socketServer.emit(event, data);
  }

  emitEventToRooms<T>(rooms: string[], event: WebsocketEventsEnum, data: T) {
    const hasRooms = !!rooms.length;

    if (hasRooms) {
      this.socketServer.to(rooms).emit(event, data);
    }
  }

  listenEvent<T>(event: WebsocketEventsEnum, listener: (arg: T) => void): void {
    this.socketServer.on(event, listener);
  }

  private async connection(socket: Socket) {
    const token = socket.request.headers.authorization;

    if (!token) {
      socket.disconnect();
      return;
    }

    const infoToken = await this.decrypter.decrypt(token);

    if (!infoToken) {
      socket.disconnect();
      return;
    }

    socket.join(infoToken.email);
    socket.on('disconnect', this.disconnect);
  }

  private disconnect() {
    console.log('disconnected');
  }
}
