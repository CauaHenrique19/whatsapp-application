import { WhatsappAdapter, WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { WhatsappWebJsWhatsappClient } from '.';

export class WhatsappWebJsAdapter implements WhatsappAdapter {
  async create(id: number, onQr: (qr: string) => void): Promise<WhatsappClientInterface> {
    console.log(`[${id}] CREATING CLIENT...`);

    const createdClient = await new Promise<Client>(async (resolve) => {
      const client = new Client({
        authStrategy: new LocalAuth({ clientId: id.toString() }),
      });

      client.on('qr', (qr) => {
        onQr(qr);
      });

      client.on('ready', () => {
        console.log('im ready!!');
        resolve(client);
      });

      await client.initialize();
    });

    const client = new WhatsappWebJsWhatsappClient(createdClient);
    return client;
  }
}
