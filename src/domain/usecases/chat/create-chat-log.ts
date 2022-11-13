import { ChatLogModel } from 'src/domain/models';

export interface CreateChatLogUseCase {
  create(parameters: CreateChatLogUseCase.Parameters): Promise<CreateChatLogUseCase.Result>;
}

export namespace CreateChatLogUseCase {
  export type Parameters = Pick<ChatLogModel, 'channelId' | 'chatId' | 'userId' | 'actionType'>[];
  export type Result = void;
}
