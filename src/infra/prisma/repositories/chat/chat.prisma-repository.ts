import { Prisma, PrismaClient } from '@prisma/client';
import { CreateChatRepository, GetChatByNumberParticipantRepository, UpdateChatRepository } from 'src/data/protocols/db';
import { GetChatByIdRepository } from 'src/data/protocols/db/chat/get-chat-by-id.repository';

export class ChatPrismaRepository
  implements CreateChatRepository, GetChatByNumberParticipantRepository, GetChatByIdRepository, UpdateChatRepository
{
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
    const result = await this.chatRepository.findFirst({
      where: {
        numberParticipant: parameters.number,
      },
      include: {
        user: true,
      },
    });

    return {
      ...result,
      user: result.user,
    };
  }

  async getById(parameters: GetChatByIdRepository.Parameters): Promise<GetChatByIdRepository.Result> {
    return await this.chatRepository.findFirst({
      where: {
        id: parameters.id,
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
