import { ChatModel } from '../chat';
import { UserModel } from '../user';

export interface MessageModel {
  id: number;
  content: string;
  createdAt: Date;
  userId?: number;
  chatId: number;
  fromParticipant: boolean;
  whatsappMessageId: string;
  ack: number;
  user?: UserModel;
  chat: ChatModel;
}
