import { UserChannelModel } from 'src/domain/models';
import { CreateUserChannelUseCase } from 'src/domain/usecases';

export interface CreateUserChannelRepository {
  create(parameters: CreateUserChannelRepository.Parameters, transaction?): Promise<CreateUserChannelRepository.Result>;
}

export namespace CreateUserChannelRepository {
  export type Parameters = Omit<UserChannelModel, 'id'>[];
  export type Result = CreateUserChannelUseCase.Result;
}
