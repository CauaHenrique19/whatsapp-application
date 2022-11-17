import { ChatLogTypeActionEnum } from 'src/data/enums';
import { ChannelModel, ChatModel } from 'src/domain/models';
import { UserModel } from 'src/domain/models/user';
import { GetChatByIdUseCase } from 'src/domain/usecases';

export interface GetChatByIdRepository {
  getById(parameters: GetChatByIdRepository.Parameters): Promise<GetChatByIdRepository.Result>;
}

export namespace GetChatByIdRepository {
  export type Parameters = GetChatByIdUseCase.Parameters;
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
