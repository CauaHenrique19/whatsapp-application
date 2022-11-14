import { CreateMessageRepository } from 'src/data/protocols/db';
import { CreateMessageUseCase } from 'src/domain/usecases';

export class DbCreateMessage implements CreateMessageUseCase {
  constructor(private readonly createMessageRepository: CreateMessageRepository) {}

  async create(parameters: CreateMessageUseCase.Parameters): Promise<CreateMessageUseCase.Result> {
    const message: CreateMessageRepository.Parameters = {
      ...parameters,
      fromParticipant: true,
      createdAt: new Date(),
    };

    return await this.createMessageRepository.create(message);
  }
}
