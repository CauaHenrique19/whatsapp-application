import { MessageModel } from 'src/domain/models';

export interface UpdateMessageRepository {
  update(parameters: UpdateMessageRepository.Parameters): Promise<UpdateMessageRepository.Result>;
}

export namespace UpdateMessageRepository {
  export type Parameters = Partial<Omit<MessageModel, 'user' | 'chat'>>;
  export type Result = Omit<MessageModel, 'user' | 'chat'>;
}
