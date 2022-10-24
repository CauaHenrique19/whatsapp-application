import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ConnectGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    console.log('new client');
  }

  async handleDisconnect(socket: Socket) {
    console.log('client disconnected');
  }

  @SubscribeMessage('get_qr_code')
  listenForMessages(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('received solicitation to get qr code: ', data);
  }
}
