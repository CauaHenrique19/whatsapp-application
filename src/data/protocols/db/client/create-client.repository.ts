import { ClientModel } from 'src/domain/models';
import { CreateClientUseCase } from 'src/domain/usecases';

export interface CreateClientRepository {
  create(parameters: CreateClientRepository.Parameters): Promise<CreateClientRepository.Result>;
}

export namespace CreateClientRepository {
  export type Parameters = Omit<ClientModel, 'id'>;
  export type Result = CreateClientUseCase.Result;
}
