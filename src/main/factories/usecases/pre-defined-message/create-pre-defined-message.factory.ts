import { Provider } from '@nestjs/common';
import { DbCreatePreDefinedMessage } from 'src/data/usecases/pre-defined-message';
import { CreatePreDefinedMessage } from 'src/domain/usecases';
import { PreDefinedMessagePrismaRepository } from 'src/infra/prisma/repositories/pre-defined-message';
import { CREATE_PRE_DEFINED_MESSAGE_FACTORY } from '../../providers';

export const createPreDefinedMessageFactory: Provider = {
  provide: CREATE_PRE_DEFINED_MESSAGE_FACTORY,
  useFactory: (preDefinedMessageRepository: PreDefinedMessagePrismaRepository): CreatePreDefinedMessage => {
    return new DbCreatePreDefinedMessage(preDefinedMessageRepository);
  },
  inject: [PreDefinedMessagePrismaRepository],
};
