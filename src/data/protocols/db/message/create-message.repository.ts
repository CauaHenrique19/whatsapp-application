import { MessageModel } from 'src/domain/models';

export interface CreateMessageRepository {
  create(parameters: CreateMessageRepository.Parameters): Promise<CreateMessageRepository.Result>;
}

export namespace CreateMessageRepository {
  export type Parameters = Omit<MessageModel, 'id' | 'user' | 'chat'>;
  export type Result = Omit<MessageModel, 'user' | 'chat'>;
}
