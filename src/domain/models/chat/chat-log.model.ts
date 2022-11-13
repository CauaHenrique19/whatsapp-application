export interface ChatLogModel {
  id: number;
  chatId: number;
  userId: number;
  channelId: number;
  actionType: number;
  createdAt: Date;
}
