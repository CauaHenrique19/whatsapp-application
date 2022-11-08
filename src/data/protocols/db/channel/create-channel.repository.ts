import { ChannelModel } from 'src/domain/models';
import { CreateChannelUseCase } from 'src/domain/usecases';

export interface CreateChannelRepository {
  create(parameters: CreateChannelRepository.Parameters, transaction?): Promise<CreateChannelRepository.Result>;
}

export namespace CreateChannelRepository {
  export type Parameters = Omit<ChannelModel, 'client' | 'users'>;
  export type Result = CreateChannelUseCase.Result;
}
