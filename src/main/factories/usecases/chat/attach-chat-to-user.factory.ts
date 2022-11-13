import { Provider } from '@nestjs/common';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { DbAttachChatToUser } from 'src/data/usecases/chat';
import { AttachChatToUserUseCase } from 'src/domain/usecases';
import { Multiton } from 'src/infra/multiton';
import { ChatLogPrismaRepository, ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { ATTACH_CHAT_TO_USER_FACTORY } from '../../providers';

export const attachChatToUserFactory: Provider = {
  provide: ATTACH_CHAT_TO_USER_FACTORY,
  useFactory: (
    chatRepository: ChatPrismaRepository,
    chatLogRepository: ChatLogPrismaRepository,
    multiton: MultitonInterface<WhatsappClientInterface>,
  ): AttachChatToUserUseCase => {
    return new DbAttachChatToUser(chatRepository, chatLogRepository, chatRepository, multiton);
  },
  inject: [ChatPrismaRepository, ChatLogPrismaRepository, Multiton],
};
