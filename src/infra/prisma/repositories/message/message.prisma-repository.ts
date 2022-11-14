import { Prisma, PrismaClient } from '@prisma/client';
import { CreateMessageRepository } from 'src/data/protocols/db';

export class MessagePrismaRepository implements CreateMessageRepository {
  private messageRepository: Prisma.MessageDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.messageRepository = prisma.message;
  }

  async create(parameters: CreateMessageRepository.Parameters): Promise<CreateMessageRepository.Result> {
    return await this.messageRepository.create({
      data: parameters,
    });
  }
}
