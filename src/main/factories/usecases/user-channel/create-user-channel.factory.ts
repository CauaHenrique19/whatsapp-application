import { Provider } from '@nestjs/common';
import { DbCreateUserChannel } from 'src/data/usecases/user-channel';
import { CreateUserChannelUseCase } from 'src/domain/usecases';
import { UserChannelPrismaRepository } from 'src/infra/prisma/repositories/user-channel';
import { CREATE_USER_CHANNEL_FACTORY } from '../../providers';

export const createUserChannelFactory: Provider = {
  provide: CREATE_USER_CHANNEL_FACTORY,
  useFactory: (userChannelRepository: UserChannelPrismaRepository): CreateUserChannelUseCase => {
    return new DbCreateUserChannel(userChannelRepository);
  },
  inject: [UserChannelPrismaRepository],
};
