import { Prisma, PrismaClient } from '@prisma/client';
import { CreateUserChannelRepository } from 'src/data/protocols/db';

export class UserChannelPrismaRepository implements CreateUserChannelRepository {
  private userChannelRepository: Prisma.UserChannelDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.userChannelRepository = prisma.userChannel;
  }

  async create(parameters: CreateUserChannelRepository.Parameters): Promise<CreateUserChannelRepository.Result> {
    await this.userChannelRepository.createMany({
      data: parameters,
    });
  }
}
