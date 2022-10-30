import { LoadUserByEmailUseCase } from 'src/domain/usecases';

export interface LoadUserByEmailRepository {
  loadByEmail(parameters: LoadUserByEmailRepository.Parameters): Promise<LoadUserByEmailRepository.Result>;
}

export namespace LoadUserByEmailRepository {
  export type Parameters = LoadUserByEmailUseCase.Parameters;
  export type Result = LoadUserByEmailUseCase.Result;
}
