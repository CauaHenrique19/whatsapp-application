import { WhatsappClientInterface } from './whatsapp-client';

//generic contract for implementation
export interface WhatsappAdapter {
  create(
    id: string,
    onQr: (qr: string) => void,
  ): Promise<WhatsappClientInterface>;
}
