import { MultitonInterface } from 'src/data/protocols/multiton';
import {
  WhatsappAdapter,
  WhatsappClientInterface,
} from 'src/data/protocols/whatsapp';
import { ConnectToWhatsapp } from 'src/domain/usecases';

export class ConnectToWhatsappUseCase implements ConnectToWhatsapp {
  constructor(
    private readonly whatsappClient: WhatsappAdapter,
    private readonly multiton: MultitonInterface<WhatsappClientInterface>,
  ) {}

  async connect(
    parameters: ConnectToWhatsapp.Parameters,
  ): Promise<ConnectToWhatsapp.Result> {
    const { id } = parameters;
    const qrCode = new Promise<string>(async (resolve) => {
      const client = await this.whatsappClient.create(id, (qrCode: string) => {
        console.log(`new qr code: ${qrCode}`);
        resolve(qrCode);
      });

      await this.multiton.addInstance({ id, instance: client });
    });

    return qrCode;
  }
}