import { Prisma, PrismaClient } from '@prisma/client';
import { CreateChatRepository, GetChatByNumberParticipantRepository, UpdateChatRepository } from 'src/data/protocols/db';

export class ChatPrismaRepository implements CreateChatRepository, GetChatByNumberParticipantRepository, UpdateChatRepository {
  private chatRepository: Prisma.ChatDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.chatRepository = prisma.chat;
  }

  async create(parameters: CreateChatRepository.Parameters): Promise<CreateChatRepository.Result> {
    return await this.chatRepository.create({
      data: {
        numberParticipant: parameters.numberParticipant,
        status: parameters.status,
        userId: parameters.userId,
      },
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

  async update(parameters: UpdateChatRepository.Parameters): Promise<UpdateChatRepository.Result> {
    return await this.chatRepository.update({
      data: parameters,
      where: {
        id: parameters.id,
      },
    });
  }
}
