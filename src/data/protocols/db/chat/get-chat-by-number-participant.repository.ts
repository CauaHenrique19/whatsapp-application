import { GetChatByNumberParticipantUseCase } from 'src/domain/usecases';

export interface GetChatByNumberParticipantRepository {
  getByNumberParticipant(parameters: GetChatByNumberParticipantRepository.Parameters): Promise<GetChatByNumberParticipantRepository.Result>;
}

export namespace GetChatByNumberParticipantRepository {
  export type Parameters = GetChatByNumberParticipantUseCase.Parameters;
  export type Result = GetChatByNumberParticipantUseCase.Result;
}
