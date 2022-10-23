import { SenderModel } from '..';

export interface MessageModel {
  id: string;
  type: string;
  from: string;
  content: string;
  isGroup: boolean;
  isStatus: boolean;
  time: Date;
  sender: SenderModel;
}
