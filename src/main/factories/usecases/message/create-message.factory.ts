import { Provider } from '@nestjs/common';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { DbCreateMessage } from 'src/data/usecases/message';
import { CreateMessageUseCase } from 'src/domain/usecases';
import { Multiton } from 'src/infra/multiton';
import { ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { MessagePrismaRepository } from 'src/infra/prisma/repositories/message';
import { CREATE_MESSAGE_FACTORY } from '../../providers';

export const createMessageFactory: Provider = {
  provide: CREATE_MESSAGE_FACTORY,
  useFactory: (
    messageRepository: MessagePrismaRepository,
    chatRepository: ChatPrismaRepository,
    multiton: MultitonInterface<WhatsappClientInterface>,
  ): CreateMessageUseCase => {
    return new DbCreateMessage(messageRepository, chatRepository, multiton);
  },
  inject: [MessagePrismaRepository, ChatPrismaRepository, Multiton],
};
