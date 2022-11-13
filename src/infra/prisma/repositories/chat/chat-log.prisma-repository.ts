import { Prisma, PrismaClient } from '@prisma/client';
import { CreateChatLogRepository } from 'src/data/protocols/db';

export class ChatLogPrismaRepository implements CreateChatLogRepository {
  private chatLogRepository: Prisma.ChatLogDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.chatLogRepository = prisma.chatLog;
  }

  async create(parameters: CreateChatLogRepository.Parameters): Promise<CreateChatLogRepository.Result> {
    await this.chatLogRepository.createMany({
      data: parameters,
    });
  }
}
