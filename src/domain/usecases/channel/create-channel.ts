import { ChannelModel } from 'src/domain/models/channel';

export interface CreateChannelUseCase {
  create(parameters: CreateChannelUseCase.Parameters): Promise<CreateChannelUseCase.Result>;
}

export namespace CreateChannelUseCase {
  export type Parameters = Pick<ChannelModel, 'clientId' | 'name'> & { users: number[] };
  export type Result = Omit<ChannelModel, 'client' | 'users' | 'createdAt'>;
}
