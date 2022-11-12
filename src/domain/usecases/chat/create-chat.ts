import { ChatModel } from 'src/domain/models';

export interface CreateChatUseCase {
  create(parameters: CreateChatUseCase.Parameters): Promise<CreateChatUseCase.Result>;
}

export namespace CreateChatUseCase {
  export type Parameters = Omit<ChatModel, 'id' | 'user'>;
  export type Result = Omit<ChatModel, 'user'>;
}
