import { CreateAvaliationRepository } from 'src/data/protocols/db';
import { CreateAvaliationUseCase } from 'src/domain/usecases';

export class DbCreateAvaliation implements CreateAvaliationUseCase {
  constructor(private readonly createAvaliationRepository: CreateAvaliationRepository) {}

  async create(parameters: CreateAvaliationUseCase.Parameters): Promise<CreateAvaliationUseCase.Result> {
    return await this.createAvaliationRepository.create(parameters);
  }
}
