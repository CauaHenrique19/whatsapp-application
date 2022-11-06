import { UsePipes, ValidationPipe } from '@nestjs/common';
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
import { controllerAdapter } from 'src/main/adapters';
import { BuildConnectToWhatsappGatewayFactory } from '../../factories/gateways/authentication';
import { ConnectToWhatsappDTO } from './dtos';

@WebSocketGateway()
export class ConnectGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly buildConnectToWhatsappGatewayFactory: BuildConnectToWhatsappGatewayFactory) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    //todo
  }

  async handleDisconnect(socket: Socket) {
    //todo
  }

  @SubscribeMessage('get_qr_code')
  @UsePipes(new ValidationPipe({ whitelist: true, skipUndefinedProperties: true }))
  async listenForMessages(@MessageBody() data: ConnectToWhatsappDTO, @ConnectedSocket() client: Socket) {
    const observer = new Observer<{ qrCode: string }>((qrCode) => {
      client.emit('new_qr_code', qrCode);
    });

    const token = client.request.headers.authorization;
    const response = await controllerAdapter(this.buildConnectToWhatsappGatewayFactory.build(), { data, observer, token });

    let event = 'new_qr_code';

    if (response.statusCode === 200) {
      event = 'connected';
    }

    return {
      event,
      data: response,
    };
  }
}
