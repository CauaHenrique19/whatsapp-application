import { CreatePreDefinedMessageRepository } from 'src/data/protocols/db';
import { PreDefinedMessageModel } from 'src/domain/models';
import { CreatePreDefinedMessage } from 'src/domain/usecases';

export class DbCreatePreDefinedMessage implements CreatePreDefinedMessage {
  constructor(private readonly createPreDefinedMessageRepository: CreatePreDefinedMessageRepository) {}

  async create(parameters: CreatePreDefinedMessage.Parameters): Promise<PreDefinedMessageModel> {
    const preDefinedMessage: CreatePreDefinedMessageRepository.Parameters = {
      content: parameters.content,
      userId: parameters.userId,
      createdAt: new Date(),
      status: 1, //create enum,
    };

    return await this.createPreDefinedMessageRepository.create(preDefinedMessage);
  }
}
