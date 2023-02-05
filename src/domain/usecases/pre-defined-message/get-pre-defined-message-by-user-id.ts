import { PreDefinedMessageModel } from 'src/domain/models';

export interface GetPreDefinedMessageByUserId {
  getByUserId(parameters: GetPreDefinedMessageByUserId.Parameters): Promise<GetPreDefinedMessageByUserId.Result>;
}

export namespace GetPreDefinedMessageByUserId {
  export type Parameters = { userId: number };
  export type Result = PreDefinedMessageModel[];
}
