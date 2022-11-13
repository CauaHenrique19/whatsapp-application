import { ChatModel } from 'src/domain/models';

export interface AttachChatToUserUseCase {
  attachToUser(parameters: AttachChatToUserUseCase.Parameters): Promise<AttachChatToUserUseCase.Result>;
}

export namespace AttachChatToUserUseCase {
  export type Parameters = {
    chatId: number;
    user: {
      id: number;
      name: string;
      lastName: string;
      clientId: number;
    };
  };

  export type Result = Omit<ChatModel, 'user' | 'channel'>;
}
