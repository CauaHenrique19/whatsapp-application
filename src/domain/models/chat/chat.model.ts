import { ChatEnum } from 'src/data/enums';
import { UserModel } from '../user';

export interface ChatModel {
  id: number;
  numberParticipant: string;
  userId: number;
  status: ChatEnum;
  user: UserModel;
}
