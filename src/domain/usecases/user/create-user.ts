import { UserModel } from 'src/domain/models/user';

export interface CreateUserUseCase {
  create(parameters: CreateUserUseCase.Parameters): Promise<CreateUserUseCase.Result>;
}

export namespace CreateUserUseCase {
  export type Parameters = Omit<UserModel, 'createdAt' | 'client' | 'status'> & { confirmationPassword: string };
  export type Result = Omit<UserModel, 'password' | 'client'>;
}
