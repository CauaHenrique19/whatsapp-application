import { Provider } from '@nestjs/common';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { DbFinishChat } from 'src/data/usecases/chat';
import { FinishChatUseCase } from 'src/domain/usecases';
import { Multiton } from 'src/infra/multiton';
import { ChatLogPrismaRepository, ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { FINISH_CHAT_FACTORY } from '../../providers';

export const finishChatFactory: Provider = {
  provide: FINISH_CHAT_FACTORY,
  useFactory: (
    chatRepository: ChatPrismaRepository,
    chatLogRepository: ChatLogPrismaRepository,
    multiton: MultitonInterface<WhatsappClientInterface>,
  ): FinishChatUseCase => {
    return new DbFinishChat(chatRepository, chatLogRepository, chatRepository, multiton);
  },
  inject: [ChatPrismaRepository, ChatLogPrismaRepository, Multiton],
};
