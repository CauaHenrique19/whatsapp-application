import { UserStatusEnum } from 'src/data/enums';
import { CreateUserRepository } from 'src/data/protocols/db';
import { UserModel } from 'src/domain/models/user';
import { CreateUserUseCase } from 'src/domain/usecases';

export class DbCreateUser implements CreateUserUseCase {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async create(parameters: CreateUserUseCase.Parameters): Promise<CreateUserUseCase.Result> {
    const user: Omit<UserModel, 'client'> = {
      email: parameters.email,
      password: parameters.password,
      name: parameters.name,
      lastName: parameters.lastName,
      status: UserStatusEnum.ACTIVE,
      clientId: parameters.clientId,
      admin: parameters.admin,
      createdAt: new Date(),
    };

    return await this.createUserRepository.create(user);
  }
}
