import { Prisma, PrismaClient } from '@prisma/client';
import { CreateMessageRepository, UpdateMessageRepository, FindMessageRepository } from 'src/data/protocols/db';

export class MessagePrismaRepository implements CreateMessageRepository, UpdateMessageRepository, FindMessageRepository {
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

  async update(parameters: UpdateMessageRepository.Parameters): Promise<UpdateMessageRepository.Result> {
    const updated = await this.messageRepository.update({
      data: parameters,
      where: {
        id: parameters.id,
        whatsappMessageId: parameters.whatsappMessageId,
      },
    });

    return updated;
  }

  async findMessage(parameters: FindMessageRepository.Parameters): Promise<FindMessageRepository.Result> {
    const message = (await this.messageRepository.findFirst({
      where: {
        OR: [
          {
            id: parameters.id,
          },
          {
            whatsappMessageId: parameters.whatsappMessageId,
          },
        ],
      },
      include: {
        chat: {
          include: {
            user: true,
          },
        },
      },
    })) as FindMessageRepository.Result;

    return message;
  }
}
