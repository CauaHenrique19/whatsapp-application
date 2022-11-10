import { Provider } from '@nestjs/common';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WebsocketInterface } from 'src/data/protocols/websocket';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { ConnectToWhatsappUseCase } from 'src/data/usecases/authentication';
import { Multiton } from 'src/infra/multiton';
import { SocketIoAdapter } from 'src/infra/websocket/socket-io';
import { WhatsappWebJsAdapter } from 'src/infra/whatsapp';
import { CONNECT_TO_WHATSAPP_FACTORY } from '../../providers';

export const connectToWhatsappFactory: Provider = {
  provide: CONNECT_TO_WHATSAPP_FACTORY,
  useFactory: (multiton: MultitonInterface<WhatsappClientInterface>, socketIoAdapter: WebsocketInterface): ConnectToWhatsappUseCase => {
    const whatsappAdapter = new WhatsappWebJsAdapter();
    return new ConnectToWhatsappUseCase(whatsappAdapter, multiton, socketIoAdapter);
  },
  inject: [Multiton<WhatsappClientInterface>, SocketIoAdapter],
};
