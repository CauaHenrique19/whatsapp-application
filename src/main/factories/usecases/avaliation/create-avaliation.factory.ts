import { Provider } from '@nestjs/common';
import { DbCreateAvaliation } from 'src/data/usecases/avaliation';
import { CreateAvaliationUseCase } from 'src/domain/usecases';
import { AvaliationPrismaRepository } from 'src/infra/prisma/repositories/avaliation';
import { CREATE_AVALIATION_FACTORY } from '../../providers';

export const createAvaliationFactory: Provider = {
  provide: CREATE_AVALIATION_FACTORY,
  useFactory: (avaliationRepository: AvaliationPrismaRepository): CreateAvaliationUseCase => {
    return new DbCreateAvaliation(avaliationRepository);
  },
  inject: [AvaliationPrismaRepository],
};
