import { Provider } from '@nestjs/common';
import { DbGetPreDefinedMessageByUserId } from 'src/data/usecases/pre-defined-message';
import { GetPreDefinedMessageByUserId } from 'src/domain/usecases';
import { PreDefinedMessagePrismaRepository } from 'src/infra/prisma/repositories/pre-defined-message';
import { GET_PRE_DEFINED_MESSAGE_BY_USER_ID_FACTORY } from '../../providers';

export const getPreDefinedMessageByUserIdFactory: Provider = {
  provide: GET_PRE_DEFINED_MESSAGE_BY_USER_ID_FACTORY,
  useFactory: (preDefinedMessagePrismaRepository: PreDefinedMessagePrismaRepository): GetPreDefinedMessageByUserId => {
    return new DbGetPreDefinedMessageByUserId(preDefinedMessagePrismaRepository);
  },
  inject: [PreDefinedMessagePrismaRepository],
};
