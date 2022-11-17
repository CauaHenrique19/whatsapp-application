import { ChatLogTypeActionEnum } from 'src/data/enums';
import { ChannelModel, ChatModel } from 'src/domain/models';
import { UserModel } from 'src/domain/models/user';

export interface GetChatByIdUseCase {
  getById(parameters: GetChatByIdUseCase.Parameters): Promise<GetChatByIdUseCase.Result>;
}

export namespace GetChatByIdUseCase {
  export type Parameters = {
    id: number;
  };

  export type Result = Pick<ChatModel, 'id' | 'numberParticipant' | 'userId' | 'channelId' | 'status'> & {
    channel: Omit<ChannelModel, 'users' | 'client'>;
    chatLog: {
      id: number;
      chatId?: number;
      userId?: number;
      actionType: ChatLogTypeActionEnum;
      createdAt: Date;
      channel: Pick<ChannelModel, 'id' | 'name' | 'description'>;
      user: Pick<UserModel, 'id' | 'email' | 'name' | 'lastName'>;
    }[];
  };
}
