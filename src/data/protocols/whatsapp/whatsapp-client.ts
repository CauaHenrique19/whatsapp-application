import { ChatModel, MessageModel } from 'src/domain/models';

//generic contract for implementation
export interface WhatsappClientInterface {
  onMessage(cb: (message: MessageModel) => void);
  getUnreadChats(): Promise<ChatModel[]>;
}
