import { CreateChatRepository } from 'src/data/protocols/db';
import { CreateChatUseCase } from 'src/domain/usecases';

export class DbCreateChat implements CreateChatUseCase {
  constructor(private readonly createChatRepository: CreateChatRepository) {}

  async create(parameters: CreateChatUseCase.Parameters): Promise<CreateChatUseCase.Result> {
    return await this.createChatRepository.create(parameters);
  }
}
