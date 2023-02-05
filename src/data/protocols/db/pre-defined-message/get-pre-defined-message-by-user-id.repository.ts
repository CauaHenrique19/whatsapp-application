import { GetPreDefinedMessageByUserId } from 'src/domain/usecases';

export interface GetPreDefinedMessageByUserIdRepository {
  getByUserId(parameters: GetPreDefinedMessageByUserIdRepository.Parameters): Promise<GetPreDefinedMessageByUserIdRepository.Result>;
}

export namespace GetPreDefinedMessageByUserIdRepository {
  export type Parameters = GetPreDefinedMessageByUserId.Parameters;
  export type Result = GetPreDefinedMessageByUserId.Result;
}
