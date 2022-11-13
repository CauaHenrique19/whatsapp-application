import { ChatLogModel } from 'src/domain/models';
import { CreateChatLogUseCase } from 'src/domain/usecases';

export interface CreateChatLogRepository {
  create(parameters: CreateChatLogRepository.Parameters): Promise<CreateChatLogRepository.Result>;
}

export namespace CreateChatLogRepository {
  export type Parameters = Omit<ChatLogModel, 'id' | 'chat' | 'user' | 'channel'>[];
  export type Result = CreateChatLogUseCase.Result;
}
