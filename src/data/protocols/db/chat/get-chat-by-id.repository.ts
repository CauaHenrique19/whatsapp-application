import { GetChatByIdUseCase } from 'src/domain/usecases';

export interface GetChatByIdRepository {
  getById(parameters: GetChatByIdRepository.Parameters): Promise<GetChatByIdRepository.Result>;
}

export namespace GetChatByIdRepository {
  export type Parameters = GetChatByIdUseCase.Parameters;
  export type Result = GetChatByIdUseCase.Result;
}
