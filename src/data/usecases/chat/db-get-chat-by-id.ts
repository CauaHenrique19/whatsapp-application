import { GetChatByIdRepository } from 'src/data/protocols/db';
import { GetChatByIdUseCase } from 'src/domain/usecases';

export class DbGetChatById implements GetChatByIdUseCase {
  constructor(private readonly getChatByIdRepository: GetChatByIdRepository) {}

  async getById(parameters: GetChatByIdUseCase.Parameters): Promise<GetChatByIdUseCase.Result> {
    return await this.getChatByIdRepository.getById(parameters);
  }
}
