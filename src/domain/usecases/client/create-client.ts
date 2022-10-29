import { ClientModel } from './../../models/client/client.model';

export interface CreateClientUseCase {
  create(parameters: CreateClientUseCase.Parameters): Promise<CreateClientUseCase.Result>;
}

export namespace CreateClientUseCase {
  export type Parameters = Pick<ClientModel, 'name'>;
  export type Result = ClientModel;
}
