import { Prisma, PrismaClient } from '@prisma/client';
import { CreateChatRepository, GetChatByNumberParticipantRepository } from 'src/data/protocols/db';

export class ChatPrismaRepository implements CreateChatRepository, GetChatByNumberParticipantRepository {
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

  async getByNumberParticipant(
    parameters: GetChatByNumberParticipantRepository.Parameters,
  ): Promise<GetChatByNumberParticipantRepository.Result> {
    return await this.chatRepository.findFirst({
      where: {
        numberParticipant: parameters.number,
      },
    });
  }
}
