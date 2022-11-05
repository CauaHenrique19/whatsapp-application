import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappAdapter, WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { ConnectToWhatsapp } from 'src/domain/usecases';

export class ConnectToWhatsappUseCase implements ConnectToWhatsapp {
  constructor(private readonly whatsappClient: WhatsappAdapter, private readonly multiton: MultitonInterface<WhatsappClientInterface>) {}

  async connect(parameters: ConnectToWhatsapp.Parameters): Promise<ConnectToWhatsapp.Result> {
    const { clientId, observer } = parameters;

    const client = await this.whatsappClient.create(clientId, (qrCode: string) => {
      observer.notify({ qrCode });
    });

    await this.multiton.addInstance({ id: clientId, instance: client });

    return {
      connected: true,
    };
  }
}
