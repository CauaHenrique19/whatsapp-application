import { WhatsappClientInterface } from './whatsapp-client';

//generic contract for implementation
export interface WhatsappAdapter {
  create(id: number, onQr: (qr: string) => void): Promise<WhatsappClientInterface>;
}
