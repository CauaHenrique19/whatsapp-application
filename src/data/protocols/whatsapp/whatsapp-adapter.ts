import { WhatsappClientInterface } from './whatsapp-client';

//generic contract for implementation
export interface WhatsappAdapter {
  create(id: string): Promise<WhatsappClientInterface>;
}
