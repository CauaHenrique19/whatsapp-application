import { Prisma, PrismaClient } from '@prisma/client';
import { CreateChannelRepository } from 'src/data/protocols/db';

export class ChannelPrismaRepository implements CreateChannelRepository {
  private channelRepository: Prisma.ChannelDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.channelRepository = prisma.channel;
  }

  async create(parameters: CreateChannelRepository.Parameters, transaction?: Prisma.TransactionClient): Promise<CreateChannelRepository.Result> {
    const client = transaction ? transaction.channel : this.channelRepository;
    return await client.create({ data: parameters });
  }
}
