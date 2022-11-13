import { Provider } from '@nestjs/common';
import { DbFinishChat } from 'src/data/usecases/chat';
import { FinishChatUseCase } from 'src/domain/usecases';
import { ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { FINISH_CHAT_FACTORY } from '../../providers';

export const finishChatFactory: Provider = {
  provide: FINISH_CHAT_FACTORY,
  useFactory: (chatRepository: ChatPrismaRepository): FinishChatUseCase => {
    return new DbFinishChat(chatRepository);
  },
  inject: [ChatPrismaRepository],
};
