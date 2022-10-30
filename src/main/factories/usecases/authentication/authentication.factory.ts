import { Provider } from '@nestjs/common';
import { Authentication } from 'src/data/usecases/authentication';
import { AuthenticationUseCase } from 'src/domain/usecases';
import { BcryptAdapter } from 'src/infra/cryptography';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { AUTHENTICATION_FACTORY } from '../../providers';

export const authenticationFactory: Provider = {
  provide: AUTHENTICATION_FACTORY,
  useFactory: (userPrismaRepository: UserPrismaRepository): AuthenticationUseCase => {
    const bcryptAdapter = new BcryptAdapter(10);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);

    return new Authentication(userPrismaRepository, bcryptAdapter, jwtAdapter);
  },
  inject: [UserPrismaRepository],
};
