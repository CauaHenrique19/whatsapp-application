import { ObserverInterface } from 'src/data/protocols/observer';
import { UserModel } from 'src/domain/models/user';

export interface ControllerData<T = any> {
  data: T;
  token?: string;
  user?: UserModel;
}
