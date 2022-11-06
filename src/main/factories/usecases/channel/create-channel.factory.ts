import { CREATE_CHANNEL_FACTORY } from './../../providers/index';
import { Provider } from '@nestjs/common';
import { ChannelPrismaRepository } from 'src/infra/prisma/repositories/channel';
import { DbCreateChannel } from 'src/data/usecases/channel';
import { CreateChannelUseCase } from 'src/domain/usecases';

export const createChannelFactory: Provider = {
  provide: CREATE_CHANNEL_FACTORY,
  useFactory(chanelRepository: ChannelPrismaRepository): CreateChannelUseCase {
    return new DbCreateChannel(chanelRepository);
  },
  inject: [ChannelPrismaRepository],
};
