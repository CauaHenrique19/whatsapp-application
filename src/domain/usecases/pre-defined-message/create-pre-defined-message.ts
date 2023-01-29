import { PreDefinedMessageModel } from 'src/domain/models';

export interface CreatePreDefinedMessage {
  create(parameters: CreatePreDefinedMessage.Parameters): Promise<CreatePreDefinedMessage.Result>;
}

export namespace CreatePreDefinedMessage {
  export type Parameters = Pick<PreDefinedMessageModel, 'content' | 'userId'>;
  export type Result = PreDefinedMessageModel;
}
