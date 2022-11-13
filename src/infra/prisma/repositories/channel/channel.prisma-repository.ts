import { Prisma, PrismaClient } from '@prisma/client';
import { ChannelStatusEnum, UserStatusEnum } from 'src/data/enums';
import { CreateChannelRepository, GetChannelsByClientIdRepository } from 'src/data/protocols/db';

export class ChannelPrismaRepository implements CreateChannelRepository, GetChannelsByClientIdRepository {
  private channelRepository: Prisma.ChannelDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.channelRepository = prisma.channel;
  }

  async create(
    parameters: CreateChannelRepository.Parameters,
    transaction?: Prisma.TransactionClient,
  ): Promise<CreateChannelRepository.Result> {
    const client = transaction ? transaction.channel : this.channelRepository;
    return await client.create({ data: parameters });
  }

  async getByClientId(parameters: GetChannelsByClientIdRepository.Parameters): Promise<GetChannelsByClientIdRepository.Result> {
    const channels = await this.channelRepository.findMany({
      where: {
        clientId: parameters.clientId,
        status: ChannelStatusEnum.ACTIVE,
      },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
            lastName: true,
            status: true,
            createdAt: true,
          },
          where: {
            status: UserStatusEnum.ACTIVE,
          },
        },
      },
    });

    return channels;
  }
}
