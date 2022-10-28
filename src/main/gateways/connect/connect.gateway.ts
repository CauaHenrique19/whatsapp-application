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
import { Observer } from 'src/infra/observer/observer';
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
    //todo
  }

  async handleDisconnect(socket: Socket) {
    console.log('client disconnected');
  }

  @SubscribeMessage('get_qr_code')
  async listenForMessages(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const observer = new Observer<{ qrCode: string }>((qrCode) => {});

    const gateway = await this.buildConnectToWhatsappGatewayFactory.build();
    await gateway.handle({ id: 'jamal', observer });
  }
}
