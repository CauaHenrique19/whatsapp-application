import { SenderModel } from '..';

export interface WhatsappMessageModel {
  id: string;
  type: string;
  from: string;
  content: string;
  isGroup: boolean;
  isStatus: boolean;
  time: Date;
  selectedRowId: string;
  sender: SenderModel;
}
