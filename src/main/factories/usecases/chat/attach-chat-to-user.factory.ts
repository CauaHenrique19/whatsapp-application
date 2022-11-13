import { Provider } from '@nestjs/common';
import { DbAttachChatToUser } from 'src/data/usecases/chat';
import { AttachChatToUserUseCase } from 'src/domain/usecases';
import { ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { ATTACH_CHAT_TO_USER_FACTORY } from '../../providers';

export const attachChatToUserFactory: Provider = {
  provide: ATTACH_CHAT_TO_USER_FACTORY,
  useFactory: (chatRepository: ChatPrismaRepository): AttachChatToUserUseCase => {
    return new DbAttachChatToUser(chatRepository);
  },
  inject: [ChatPrismaRepository],
};
