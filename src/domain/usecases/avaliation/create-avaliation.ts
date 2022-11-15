import { AvaliationModel } from 'src/domain/models';

export interface CreateAvaliationUseCase {
  create(parameters: CreateAvaliationUseCase.Parameters): Promise<CreateAvaliationUseCase.Result>;
}

export namespace CreateAvaliationUseCase {
  export type Parameters = Omit<AvaliationModel, 'id' | 'chat' | 'user'>;
  export type Result = Omit<AvaliationModel, 'chat' | 'user'>;
}
