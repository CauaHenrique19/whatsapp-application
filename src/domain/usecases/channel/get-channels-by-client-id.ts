import { UserStatusEnum } from 'src/data/enums';

export interface GetChannelsByClientIdUseCase {
  getByClientId(parameters: GetChannelsByClientIdUseCase.Parameters): Promise<GetChannelsByClientIdUseCase.Result>;
}

export namespace GetChannelsByClientIdUseCase {
  export type Parameters = {
    clientId: number;
  };

  export type Result = {
    id?: number;
    name: string;
    clientId: number;
    status: number;
    createdAt: Date;
    users: {
      id?: number;
      email: string;
      name: string;
      lastName: string;
      status: UserStatusEnum;
      createdAt: Date;
    }[];
  }[];
}
