import { WhatsappChatModel, WhatsappMessageModel } from 'src/domain/models';

//generic contract for implementation
export interface WhatsappClientInterface {
  onMessage(cb: (message: WhatsappMessageModel) => void);
  getUnreadChats(): Promise<WhatsappChatModel[]>;
}
