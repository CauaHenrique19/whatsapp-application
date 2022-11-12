import { CreateChatUseCase } from 'src/domain/usecases';

export interface CreateChatRepository {
  create(parameters: CreateChatRepository.Parameters): Promise<CreateChatRepository.Result>;
}

export namespace CreateChatRepository {
  export type Parameters = CreateChatUseCase.Parameters;
  export type Result = CreateChatUseCase.Result;
}
