import { Prisma, PrismaClient } from '@prisma/client';
import { CreatePreDefinedMessageRepository } from 'src/data/protocols/db';

export class PreDefinedMessagePrismaRepository implements CreatePreDefinedMessageRepository {
  private preDefinedMessageRepository: Prisma.PreDefinedMessageDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.preDefinedMessageRepository = prisma.preDefinedMessage;
  }

  async create(parameters: CreatePreDefinedMessageRepository.Parameters): Promise<CreatePreDefinedMessageRepository.Result> {
    return await this.preDefinedMessageRepository.create({
      data: parameters,
    });
  }
}
