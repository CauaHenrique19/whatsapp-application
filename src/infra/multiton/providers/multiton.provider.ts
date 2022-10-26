import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { Provider } from '@nestjs/common';
import { Multiton } from '../implementations';

export const MultitonProvider: Provider = {
  provide: Multiton<WhatsappClientInterface>,
  useClass: Multiton<WhatsappClientInterface>,
};
