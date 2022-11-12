import { Prisma, PrismaClient } from '@prisma/client';
import { CreateChatRepository } from 'src/data/protocols/db';

export class ChatPrismaRepository implements CreateChatRepository {
  private chatRepository: Prisma.ChatDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.chatRepository = prisma.chat;
  }

  async create(parameters: CreateChatRepository.Parameters): Promise<CreateChatRepository.Result> {
    return await this.chatRepository.create({
      data: parameters,
    });
  }
}
