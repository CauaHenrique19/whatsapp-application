import { UpdateChatUseCase } from 'src/domain/usecases';

export interface UpdateChatRepository {
  update(parameters: UpdateChatRepository.Parameters): Promise<UpdateChatRepository.Result>;
}

export namespace UpdateChatRepository {
  export type Parameters = UpdateChatUseCase.Parameters;
  export type Result = UpdateChatUseCase.Result;
}
