import { ChatLogTypeActionEnum } from 'src/data/enums';
import { AvaliationModel } from '../avaliation';
import { ChannelModel } from '../channel';
import { UserModel } from '../user';
import { ChatModel } from './chat.model';

export interface ChatLogModel {
  id?: number;
  chatId?: number;
  userId?: number;
  channelId?: number;
  avaliationId?: number;
  actionType: ChatLogTypeActionEnum;
  createdAt: Date;
  chat?: ChatModel;
  user?: UserModel;
  channel?: ChannelModel;
  avaliation?: AvaliationModel;
}
