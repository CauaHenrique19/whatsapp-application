import { UserStatusEnum } from 'src/data/enums';
import { Hasher } from 'src/data/protocols/cryptography';
import { CreateUserRepository, LoadUserByEmailRepository } from 'src/data/protocols/db';
import { UserModel } from 'src/domain/models/user';
import { CreateUserUseCase } from 'src/domain/usecases';

export class DbCreateUser implements CreateUserUseCase {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher,
  ) {}

  async create(parameters: CreateUserUseCase.Parameters): Promise<CreateUserUseCase.Result> {
    const userInDb = await this.loadUserByEmailRepository.loadByEmail(parameters.email);
    if (userInDb) {
      return {
        valid: false,
        result: 'Already exists user with this email',
      };
    }

    const hashedPassword = await this.hasher.hash(parameters.password);

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

    const createdUser = await this.createUserRepository.create(user);

    return {
      valid: true,
      result: createdUser,
    };
  }
}
