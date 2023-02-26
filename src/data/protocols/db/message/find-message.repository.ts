import { MessageModel } from 'src/domain/models';

export interface FindMessageRepository {
  findMessage(parameters: FindMessageRepository.Parameters): Promise<FindMessageRepository.Result>;
}

export namespace FindMessageRepository {
  export type Parameters = Partial<Omit<MessageModel, 'user' | 'chat'>>;
  export type Result = MessageModel;
}
