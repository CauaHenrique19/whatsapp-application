import { Provider } from '@nestjs/common';
import { DbAttachChatToUser } from 'src/data/usecases/chat';
import { AttachChatToUserUseCase } from 'src/domain/usecases';
import { ChatLogPrismaRepository, ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { ATTACH_CHAT_TO_USER_FACTORY } from '../../providers';

export const attachChatToUserFactory: Provider = {
  provide: ATTACH_CHAT_TO_USER_FACTORY,
  useFactory: (chatRepository: ChatPrismaRepository, chatLogRepository: ChatLogPrismaRepository): AttachChatToUserUseCase => {
    return new DbAttachChatToUser(chatRepository, chatLogRepository);
  },
  inject: [ChatPrismaRepository, ChatLogPrismaRepository],
};
