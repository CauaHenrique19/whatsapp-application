import { UserStatusEnum } from 'src/data/enums';
import { ClientModel } from '../client';

export interface UserModel {
  id?: number;
  email: string;
  name: string;
  lastName: string;
  password: string;
  admin: boolean;
  clientId: number;
  status: UserStatusEnum;
  createdAt: Date;
  client: ClientModel;
}
