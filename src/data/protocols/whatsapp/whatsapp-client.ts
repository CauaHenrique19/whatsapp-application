import {
  WhatsappChatModel,
  WhatsappList,
  WhatsappMessageModel,
  WhatsappSendedMessageModel,
  WhatsappMessageAckUpdated,
} from 'src/domain/models';

//generic contract for implementation
export interface WhatsappClientInterface {
  onMessage(cb: (message: WhatsappMessageModel) => void);
  getUnreadChats(): Promise<WhatsappChatModel[]>;
  sendMessage(number: string, content: WhatsappList | string): Promise<WhatsappSendedMessageModel>;
  onAckUpdated(cb: (ackUpdated: WhatsappMessageAckUpdated) => void);
}
