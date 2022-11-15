import { CreateAvaliationUseCase } from 'src/domain/usecases';

export interface CreateAvaliationRepository {
  create(parameters: CreateAvaliationRepository.Parameters): Promise<CreateAvaliationRepository.Result>;
}

export namespace CreateAvaliationRepository {
  export type Parameters = CreateAvaliationUseCase.Parameters;
  export type Result = CreateAvaliationUseCase.Result;
}
