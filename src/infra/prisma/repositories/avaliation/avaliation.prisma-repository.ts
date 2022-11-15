import { Prisma, PrismaClient } from '@prisma/client';
import { CreateAvaliationRepository } from 'src/data/protocols/db';

export class AvaliationPrismaRepository implements CreateAvaliationRepository {
  private avaliationRepository: Prisma.AvaliationDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.avaliationRepository = prisma.avaliation;
  }

  async create(parameters: CreateAvaliationRepository.Parameters): Promise<CreateAvaliationRepository.Result> {
    return await this.avaliationRepository.create({
      data: parameters,
    });
  }
}
