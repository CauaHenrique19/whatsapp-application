import { UserStatusEnum } from 'src/data/enums';
import { Encrypter } from 'src/data/protocols/cryptography';
import { CreateUserRepository } from 'src/data/protocols/db';
import { UserModel } from 'src/domain/models/user';
import { CreateUserUseCase } from 'src/domain/usecases';

export class DbCreateUser implements CreateUserUseCase {
  constructor(private readonly createUserRepository: CreateUserRepository, private readonly encrypter: Encrypter) {}

  async create(parameters: CreateUserUseCase.Parameters): Promise<CreateUserUseCase.Result> {
    const hashedPassword = await this.encrypter.encrypt(parameters.password);

    const user: Omit<UserModel, 'client'> = {
      email: parameters.email,
      password: hashedPassword,
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
