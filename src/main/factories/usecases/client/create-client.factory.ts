import { Provider } from '@nestjs/common';
import { DbCreateClient } from 'src/data/usecases/client';
import { CreateClientUseCase } from 'src/domain/usecases';
import { ClientPrismaRepository } from 'src/infra/prisma/repositories/client';
import { CREATE_CLIENT_FACTORY } from '../../providers';

export const createClientFactory: Provider = {
  provide: CREATE_CLIENT_FACTORY,
  useFactory: (clientPrismaRepository: ClientPrismaRepository): CreateClientUseCase => {
    return new DbCreateClient(clientPrismaRepository);
  },
  inject: [ClientPrismaRepository],
};
