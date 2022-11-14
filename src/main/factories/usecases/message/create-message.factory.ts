import { Provider } from '@nestjs/common';
import { DbCreateMessage } from 'src/data/usecases/message';
import { CreateMessageUseCase } from 'src/domain/usecases';
import { MessagePrismaRepository } from 'src/infra/prisma/repositories/message';
import { CREATE_MESSAGE_FACTORY } from '../../providers';

export const createMessageFactory: Provider = {
  provide: CREATE_MESSAGE_FACTORY,
  useFactory: (messageRepository: MessagePrismaRepository): CreateMessageUseCase => {
    return new DbCreateMessage(messageRepository);
  },
  inject: [MessagePrismaRepository],
};
