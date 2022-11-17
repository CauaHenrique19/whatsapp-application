import { Prisma, PrismaClient, ChatLog } from '@prisma/client';
import { ChatLogTypeActionEnum } from 'src/data/enums';
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

    return result;
  }

  async getById(parameters: GetChatByIdRepository.Parameters): Promise<GetChatByIdRepository.Result> {
    const result = await this.chatRepository.findFirst({
      select: {
        id: true,
        numberParticipant: true,
        userId: true,
        channelId: true,
        status: true,
        channel: true,
        chatLog: {
          select: {
            id: true,
            chatId: true,
            userId: true,
            actionType: true,
            createdAt: true,
            channel: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                lastName: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      where: {
        id: parameters.id,
      },
    });

    return result;
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
