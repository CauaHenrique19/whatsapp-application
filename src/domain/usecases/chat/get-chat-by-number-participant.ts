import { ChatModel } from 'src/domain/models';

export interface GetChatByNumberParticipantUseCase {
  getByNumberParticipant(parameters: GetChatByNumberParticipantUseCase.Parameters): Promise<GetChatByNumberParticipantUseCase.Result>;
}

export namespace GetChatByNumberParticipantUseCase {
  export type Parameters = {
    number: string;
  };
  export type Result = Omit<ChatModel, 'user'>;
}
