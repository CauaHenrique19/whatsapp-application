import { UserModel } from 'src/domain/models/user';

export interface AuthenticationUseCase {
  authentication(parameters: AuthenticationUseCase.Parameters): Promise<AuthenticationUseCase.Result>;
}

export namespace AuthenticationUseCase {
  export type Parameters = {
    email: string;
    password: string;
  };

  export type Result = {
    valid: boolean;
    result:
      | {
          token: string;
          user: Omit<UserModel, 'client' | 'password'>;
        }
      | string;
  };
}
