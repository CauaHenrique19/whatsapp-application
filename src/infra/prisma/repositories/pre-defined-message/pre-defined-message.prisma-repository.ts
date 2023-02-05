import { Prisma, PrismaClient } from '@prisma/client';
import { CreatePreDefinedMessageRepository, GetPreDefinedMessageByUserIdRepository } from 'src/data/protocols/db';

export class PreDefinedMessagePrismaRepository implements CreatePreDefinedMessageRepository, GetPreDefinedMessageByUserIdRepository {
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

  async getByUserId(parameters: GetPreDefinedMessageByUserIdRepository.Parameters): Promise<GetPreDefinedMessageByUserIdRepository.Result> {
    return await this.preDefinedMessageRepository.findMany({
      where: {
        userId: parameters.userId,
      },
    });
  }
}
