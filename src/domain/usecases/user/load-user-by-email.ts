import { UserModel } from 'src/domain/models/user';

export interface LoadUserByEmailUseCase {
  loadByEmail(email: LoadUserByEmailUseCase.Parameters): Promise<LoadUserByEmailUseCase.Result>;
}

export namespace LoadUserByEmailUseCase {
  export type Parameters = string;
  export type Result = Omit<UserModel, 'client'>;
}
