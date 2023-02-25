import { WhatsappChatModel, WhatsappList, WhatsappMessageModel, WhatsappSendedMessageModel } from 'src/domain/models';

//generic contract for implementation
export interface WhatsappClientInterface {
  onMessage(cb: (message: WhatsappMessageModel) => void);
  getUnreadChats(): Promise<WhatsappChatModel[]>;
  sendMessage(number: string, content: WhatsappList | string): Promise<WhatsappSendedMessageModel>;
}
