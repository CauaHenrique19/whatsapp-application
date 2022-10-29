import { PrismaClient, Prisma } from '@prisma/client';
import { CreateClientRepository } from 'src/data/protocols/db';

export class ClientPrismaRepository implements CreateClientRepository {
  private clientRepository: Prisma.ClientDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.clientRepository = prisma.client;
  }

  async create(parameters: CreateClientRepository.Parameters): Promise<CreateClientRepository.Result> {
    return await this.clientRepository.create({
      data: parameters,
    });
  }
}
