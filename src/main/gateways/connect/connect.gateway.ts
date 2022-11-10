import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageModel } from 'src/domain/models';
import { Observer } from 'src/infra/observer/observer';
import { controllerAdapter } from 'src/main/adapters';
import { BuildEmitMessageGatewayFactory } from 'src/main/factories/gateways/message';
import { BuildConnectToWhatsappGatewayFactory } from '../../factories/gateways/authentication';
import { ConnectToWhatsappDTO } from './dtos';

@WebSocketGateway()
export class ConnectGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly buildConnectToWhatsappGatewayFactory: BuildConnectToWhatsappGatewayFactory,
    private readonly buildEmitMessageGatewayFactory: BuildEmitMessageGatewayFactory,
  ) {}

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
    const token = client.request.headers.authorization;
    const response = await controllerAdapter(this.buildConnectToWhatsappGatewayFactory.build(), { data, token });

    let event = 'new_qr_code';

    if (response.statusCode === 200) {
      event = 'connected';
    }

    return {
      event,
      data: response,
    };
  }

  @SubscribeMessage('allow_receive_messages')
  async allowReceiveMessages(@MessageBody() data: ConnectToWhatsappDTO, @ConnectedSocket() client: Socket): Promise<WsResponse<any>> {
    const token = client.request.headers.authorization;
    const response = await controllerAdapter(this.buildEmitMessageGatewayFactory.build(), { data, token });

    return {
      event: 'result_allow_receive_messages',
      data: response,
    };
  }
}
