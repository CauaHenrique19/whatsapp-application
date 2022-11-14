import { ChannelModel, ChatModel } from 'src/domain/models';

export interface GetChatByIdRepository {
  getById(parameters: GetChatByIdRepository.Parameters): Promise<GetChatByIdRepository.Result>;
}

export namespace GetChatByIdRepository {
  export type Parameters = {
    id: number;
  };

  export type Result = Omit<ChatModel, 'user' | 'channel'> & { channel: Omit<ChannelModel, 'client' | 'users'> };
}
