import { Provider } from '@nestjs/common';
import { DbCreateUser } from 'src/data/usecases/user';
import { CreateUserUseCase } from 'src/domain/usecases';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { CREATE_USER_FACTORY } from '../../providers';

export const createUserFactory: Provider = {
  provide: CREATE_USER_FACTORY,
  useFactory: (userPrismaRepository: UserPrismaRepository): CreateUserUseCase => {
    return new DbCreateUser(userPrismaRepository);
  },
  inject: [UserPrismaRepository],
};
