import { GetChannelsByClientIdUseCase } from 'src/domain/usecases';

export interface GetChannelsByClientIdRepository {
  getByClientId(parameters: GetChannelsByClientIdRepository.Parameters): Promise<GetChannelsByClientIdRepository.Result>;
}

export namespace GetChannelsByClientIdRepository {
  export type Parameters = GetChannelsByClientIdUseCase.Parameters;
  export type Result = GetChannelsByClientIdUseCase.Result;
}
