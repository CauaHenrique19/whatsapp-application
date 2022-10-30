import { UserModel } from 'src/domain/models/user';

export interface CreateUserRepository {
  create(parameters: CreateUserRepository.Parameters): Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Parameters = Omit<UserModel, 'client'>;
  export type Result = Omit<UserModel, 'password' | 'client'>;
}
