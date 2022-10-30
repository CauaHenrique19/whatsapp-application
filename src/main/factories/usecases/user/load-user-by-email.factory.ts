import { Provider } from '@nestjs/common';
import { DbLoadUserByEmail } from 'src/data/usecases/user';
import { LoadUserByEmailUseCase } from 'src/domain/usecases';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';

export const loadUserByEmailFactory: Provider = {
  provide: LOAD_USER_BY_EMAIL_FACTORY,
  useFactory: (userPrismaRepository: UserPrismaRepository): LoadUserByEmailUseCase => {
    return new DbLoadUserByEmail(userPrismaRepository);
  },
  inject: [UserPrismaRepository],
};
