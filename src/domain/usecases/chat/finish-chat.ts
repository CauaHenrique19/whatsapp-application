import { ChatModel } from 'src/domain/models';

export interface FinishChatUseCase {
  finish(parameters: FinishChatUseCase.Parameters): Promise<FinishChatUseCase.Result>;
}

export namespace FinishChatUseCase {
  export type Parameters = {
    chatId: number;
    userId: number;
  };
  export type Result = Omit<ChatModel, 'user' | 'channel'>;
}
