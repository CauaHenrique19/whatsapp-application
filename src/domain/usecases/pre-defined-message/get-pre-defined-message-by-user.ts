import { PreDefinedMessageModel } from 'src/domain/models';

export interface GetPreDefinedMessageByUser {
  getByUser(parameters: GetPreDefinedMessageByUser.Parameters): Promise<GetPreDefinedMessageByUser.Result>;
}

export namespace GetPreDefinedMessageByUser {
  export type Parameters = { userId: number };
  export type Result = PreDefinedMessageModel[];
}
