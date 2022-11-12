import { ChatModel } from '../chat';

export interface MessageModel {
  id: number;
  content: string;
  createdAt: Date;
  chatId: number;
  from: string;
  chat: ChatModel;
}
