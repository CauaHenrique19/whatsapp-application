import { UserModel } from 'src/domain/models/user';
import { CreateUserUseCase } from 'src/domain/usecases';

export interface CreateUserRepository {
  create(parameters: CreateUserRepository.Parameters): Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Parameters = Omit<UserModel, 'client'>;
  export type Result = CreateUserUseCase.Result;
}
