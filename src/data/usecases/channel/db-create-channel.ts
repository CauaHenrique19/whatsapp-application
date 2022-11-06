import { ChannelStatusEnum } from 'src/data/enums';
import { CreateChannelRepository } from 'src/data/protocols/db';
import { CreateChannelUseCase } from 'src/domain/usecases';

export class DbCreateChannel implements CreateChannelUseCase {
  constructor(private readonly createChannelRepository: CreateChannelRepository) {}

  async create(parameters: CreateChannelUseCase.Parameters): Promise<CreateChannelUseCase.Result> {
    const channel: CreateChannelRepository.Parameters = {
      clientId: parameters.clientId,
      name: parameters.name,
      status: ChannelStatusEnum.ACTIVE,
      createdAt: new Date(),
    };

    return await this.createChannelRepository.create(channel);
  }
}
