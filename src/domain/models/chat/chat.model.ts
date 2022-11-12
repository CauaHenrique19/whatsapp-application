import { UserModel } from '../user';

export interface ChatModel {
  id: number;
  numberParticipant: string;
  userId: number;
  status: number;
  user: UserModel;
}
