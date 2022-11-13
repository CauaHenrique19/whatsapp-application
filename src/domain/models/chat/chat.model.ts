import { ChatStatusEnum } from 'src/data/enums';
import { ChannelModel } from '../channel';
import { UserModel } from '../user';

export interface ChatModel {
  id?: number;
  numberParticipant: string;
  userId?: number;
  channelId?: number;
  status: ChatStatusEnum;
  user?: UserModel;
  channel?: ChannelModel;
}
