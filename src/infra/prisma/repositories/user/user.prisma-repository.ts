import { Prisma, PrismaClient } from '@prisma/client';
import { CreateUserRepository, LoadUserByEmailRepository } from 'src/data/protocols/db';

export class UserPrismaRepository implements CreateUserRepository, LoadUserByEmailRepository {
  private userRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.userRepository = prisma.user;
  }

  async create(parameters: CreateUserRepository.Parameters): Promise<CreateUserRepository.Result> {
    const result = await this.userRepository.create({
      data: parameters
    });

    delete result.password;

    return result
  }

  async loadByEmail(email: LoadUserByEmailRepository.Parameters): Promise<LoadUserByEmailRepository.Result> {
    const user = await this.userRepository.findFirst({
      where: {
        email: email,
      },
    });

    return user?.id
      ? user
      : null;
  }
}
