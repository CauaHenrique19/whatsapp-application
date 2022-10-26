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
import { BuildConnectToWhatsappGatewayFactory } from '../../factories/gateways/authentication';

@WebSocketGateway()
export class ConnectGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly buildConnectToWhatsappGatewayFactory: BuildConnectToWhatsappGatewayFactory,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    console.log('new client');
  }

  async handleDisconnect(socket: Socket) {
    console.log('client disconnected');
  }

  @SubscribeMessage('get_qr_code')
  async listenForMessages(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const gateway = await this.buildConnectToWhatsappGatewayFactory.build();
    const qrCode = await gateway.handle({ id: 'jamal' });

    console.log(qrCode);
    console.log('received solicitation to get qr code: ', data);
  }
}
