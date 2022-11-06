import { UserChannelStatusEnum } from 'src/data/enums';

export interface UserChannelModel {
  id: number;
  userId: number;
  channelId: number;
  status: UserChannelStatusEnum;
  createdAt: Date;
}
