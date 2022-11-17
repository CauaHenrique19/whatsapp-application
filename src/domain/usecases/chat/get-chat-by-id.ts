import { ChatLogTypeActionEnum } from 'src/data/enums';
import { ChannelModel, ChatModel } from 'src/domain/models';

export interface GetChatByIdUseCase {
  getById(parameters: GetChatByIdUseCase.Parameters): Promise<GetChatByIdUseCase.Result>;
}

export namespace GetChatByIdUseCase {
  export type Parameters = {
    id: number;
  };

  export type Result = (Pick<ChatModel, 'id' | 'numberParticipant' | 'userId' | 'channelId' | 'status'> & { statusLabel: string }) & {
    channel?: Omit<ChannelModel, 'users' | 'client'> & { formattedCreatedAt: string };
    chatLog: {
      id: number;
      chatId?: number;
      userId?: number;
      actionType: ChatLogTypeActionEnum;
      createdAt: Date;
      formattedCreatedAt: string;
    }[];
  };
}
