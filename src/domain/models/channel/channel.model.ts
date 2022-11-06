import { ClientModel } from '../client';
import { UserModel } from '../user';

export interface ChannelModel {
  id?: number;
  name: string;
  clientId: number;
  status: number;
  createdAt: Date;
  client: ClientModel;
  users: UserModel[];
}
