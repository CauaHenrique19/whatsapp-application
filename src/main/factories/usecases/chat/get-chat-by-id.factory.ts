import { Provider } from '@nestjs/common';
import { DbGetChatById } from 'src/data/usecases/chat';
import { GetChatByIdUseCase } from 'src/domain/usecases';
import { ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { GET_CHAT_BY_ID_FACTORY } from '../../providers';

export const getChatByIdFactory: Provider = {
  provide: GET_CHAT_BY_ID_FACTORY,
  useFactory: (chatRepository: ChatPrismaRepository): GetChatByIdUseCase => {
    return new DbGetChatById(chatRepository);
  },
  inject: [ChatPrismaRepository],
};
