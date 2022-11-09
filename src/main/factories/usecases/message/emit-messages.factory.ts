import { Provider } from '@nestjs/common';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { EmitMessages } from 'src/data/usecases/message';
import { EmitMessagesUseCase } from 'src/domain/usecases';
import { Multiton } from 'src/infra/multiton';
import { EMIT_MESSAGES_FACTORY } from '../../providers';

export const emitMessagesFactory: Provider = {
  provide: EMIT_MESSAGES_FACTORY,
  useFactory: (multitonProvider: MultitonInterface<WhatsappClientInterface>): EmitMessagesUseCase => {
    return new EmitMessages(multitonProvider);
  },
  inject: [Multiton],
};
