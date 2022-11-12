import { ChatModel } from 'src/domain/models';

export interface UpdateChatUseCase {
  update(parameters: UpdateChatUseCase.Parameters): Promise<UpdateChatUseCase.Result>;
}

export namespace UpdateChatUseCase {
  export type Parameters = Omit<ChatModel, 'user' | 'numberParticipant'>;
  export type Result = Omit<ChatModel, 'user'>;
}
