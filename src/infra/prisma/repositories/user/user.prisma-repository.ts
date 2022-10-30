import { Prisma, PrismaClient } from '@prisma/client';
import { CreateUserRepository } from 'src/data/protocols/db';

export class UserPrismaRepository implements CreateUserRepository {
  private userRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor() {
    const prisma = new PrismaClient();
    this.userRepository = prisma.user;
  }

  async create(parameters: CreateUserRepository.Parameters): Promise<CreateUserRepository.Result> {
    const { name, lastName, email, password, admin, clientId, createdAt, status } = parameters;

    const result = await this.userRepository.create({
      data: {
        name,
        last_name: lastName,
        email,
        password,
        admin,
        client_id: clientId,
        createdAt,
        status,
      },
    });

    delete result.password;

    return {
      ...result,
      lastName: result.last_name,
      clientId: result.client_id,
    };
  }
}
