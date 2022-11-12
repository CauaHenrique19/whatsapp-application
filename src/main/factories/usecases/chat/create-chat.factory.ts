import { Provider } from '@nestjs/common';
import { DbCreateChat } from 'src/data/usecases/chat';
import { CreateChatUseCase } from 'src/domain/usecases';
import { ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { CREATE_CHAT_FACTORY } from '../../providers';

export const createChatFactory: Provider = {
  provide: CREATE_CHAT_FACTORY,
  useFactory: (chatRepository: ChatPrismaRepository): CreateChatUseCase => {
    return new DbCreateChat(chatRepository);
  },
  inject: [ChatPrismaRepository],
};
