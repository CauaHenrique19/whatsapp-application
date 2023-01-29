import { PreDefinedMessageModel } from 'src/domain/models';

export interface CreatePreDefinedMessageRepository {
  create(parameters: CreatePreDefinedMessageRepository.Parameters): Promise<CreatePreDefinedMessageRepository.Result>;
}

export namespace CreatePreDefinedMessageRepository {
  export type Parameters = Omit<PreDefinedMessageModel, 'id'>;
  export type Result = PreDefinedMessageModel;
}
