import { WebsocketEventsEnum } from 'src/data/enums';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WebsocketInterface } from 'src/data/protocols/websocket';
import { WhatsappAdapter, WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { ConnectToWhatsapp } from 'src/domain/usecases';

export class ConnectToWhatsappUseCase implements ConnectToWhatsapp {
  constructor(
    private readonly whatsappClient: WhatsappAdapter,
    private readonly multiton: MultitonInterface<WhatsappClientInterface>,
    private readonly websocketAdapter: WebsocketInterface,
  ) {}

  async connect(parameters: ConnectToWhatsapp.Parameters): Promise<ConnectToWhatsapp.Result> {
    const { clientId } = parameters;

    const client = await this.whatsappClient.create(clientId, (qrCode: string) => {
      this.websocketAdapter.emitEvent<{ qrCode: string }>(WebsocketEventsEnum.NEW_QR_CODE, { qrCode });
    });

    await this.multiton.addInstance({ id: clientId, instance: client });

    return {
      connected: true,
    };
  }
}
