import { UserChannelModel } from 'src/domain/models';

export interface CreateUserChannelUseCase {
  create(parameters: CreateUserChannelUseCase.Parameters): Promise<CreateUserChannelUseCase.Result>;
}

export namespace CreateUserChannelUseCase {
  export type Parameters = Omit<UserChannelModel, 'id' | 'status' | 'createdAt'>[];
  export type Result = void;
}
