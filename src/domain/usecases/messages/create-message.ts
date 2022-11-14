import { MessageModel } from 'src/domain/models';

export interface CreateMessageUseCase {
  create(parameters: CreateMessageUseCase.Parameters): Promise<CreateMessageUseCase.Result>;
}

export namespace CreateMessageUseCase {
  export type Parameters = Omit<MessageModel, 'id' | 'userId' | 'chat' | 'createdAt' | 'fromParticipant'>;
  export type Result = Omit<MessageModel, 'user' | 'chat'>;
}
