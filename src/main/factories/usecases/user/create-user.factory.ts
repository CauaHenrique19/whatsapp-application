import { Provider } from '@nestjs/common';
import { DbCreateUser } from 'src/data/usecases/user';
import { CreateUserUseCase } from 'src/domain/usecases';
import { BcryptAdapter } from 'src/infra/cryptography';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { CREATE_USER_FACTORY } from '../../providers';

export const createUserFactory: Provider = {
  provide: CREATE_USER_FACTORY,
  useFactory: (userPrismaRepository: UserPrismaRepository): CreateUserUseCase => {
    const bcryptAdapter = new BcryptAdapter(10);
    return new DbCreateUser(userPrismaRepository, userPrismaRepository, bcryptAdapter);
  },
  inject: [UserPrismaRepository],
};
