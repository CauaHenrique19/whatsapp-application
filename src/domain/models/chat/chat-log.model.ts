import { ChatLogTypeActionEnum } from 'src/data/enums';

export interface ChatLogModel {
  id: number;
  chatId: number;
  userId: number;
  channelId: number;
  actionType: ChatLogTypeActionEnum;
  createdAt: Date;
}
