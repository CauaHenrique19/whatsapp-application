import { ClientStatusEnum } from 'src/data/enums';
import { CreateClientRepository } from 'src/data/protocols/db';
import { ClientModel } from 'src/domain/models';
import { CreateClientUseCase } from 'src/domain/usecases';

export class DbCreateClient implements CreateClientUseCase {
  constructor(private readonly createClientRepository: CreateClientRepository) {}

  async create(parameters: CreateClientUseCase.Parameters): Promise<CreateClientUseCase.Result> {
    const client: ClientModel = {
      name: parameters.name,
      createdAt: new Date(),
      status: ClientStatusEnum.PRE_REGISTER,
    };

    return await this.createClientRepository.create(client);
  }
}
