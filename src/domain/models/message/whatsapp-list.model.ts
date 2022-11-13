import { WhatsappSection } from './whatsapp-section.model';

export interface WhatsappList {
  body: string;
  buttonText: string;
  sections: WhatsappSection[];
  title?: string;
  footer?: string;
}
