import { CREATE_CHANNEL_FACTORY } from './../../providers/index';
import { Provider } from '@nestjs/common';
import { ChannelPrismaRepository } from 'src/infra/prisma/repositories/channel';
import { DbCreateChannel } from 'src/data/usecases/channel';
import { CreateChannelUseCase } from 'src/domain/usecases';
import { UserChannelPrismaRepository } from 'src/infra/prisma/repositories/user-channel';
import { PrismaTransactionManager } from 'src/infra/prisma/transaction-manager';

export const createChannelFactory: Provider = {
  provide: CREATE_CHANNEL_FACTORY,
  useFactory(
    chanelRepository: ChannelPrismaRepository,
    userChannelRepository: UserChannelPrismaRepository,
    transactionManager: PrismaTransactionManager,
  ): CreateChannelUseCase {
    return new DbCreateChannel(chanelRepository, userChannelRepository, transactionManager);
  },
  inject: [ChannelPrismaRepository, UserChannelPrismaRepository, PrismaTransactionManager],
};
