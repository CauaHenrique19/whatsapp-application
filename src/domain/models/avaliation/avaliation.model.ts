import { ChatModel } from '../chat';
import { UserModel } from '../user';

export interface AvaliationModel {
  id: number;
  userId: number;
  chatId: number;
  note: number;
  createdAt: Date;

  user: UserModel;
  chat: ChatModel;
}
