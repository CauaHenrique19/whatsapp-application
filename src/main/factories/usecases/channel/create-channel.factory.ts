import { CREATE_CHANNEL_FACTORY } from './../../providers/index';
import { Provider } from '@nestjs/common';
import { ChannelPrismaRepository } from 'src/infra/prisma/repositories/channel';
import { DbCreateChannel } from 'src/data/usecases/channel';
import { CreateChannelUseCase } from 'src/domain/usecases';
import { UserChannelPrismaRepository } from 'src/infra/prisma/repositories/user-channel';

export const createChannelFactory: Provider = {
  provide: CREATE_CHANNEL_FACTORY,
  useFactory(chanelRepository: ChannelPrismaRepository, userChannelRepository: UserChannelPrismaRepository): CreateChannelUseCase {
    return new DbCreateChannel(chanelRepository, userChannelRepository);
  },
  inject: [ChannelPrismaRepository, UserChannelPrismaRepository],
};
