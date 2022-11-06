import { ChannelStatusEnum, UserChannelStatusEnum } from 'src/data/enums';
import { CreateChannelRepository, CreateUserChannelRepository } from 'src/data/protocols/db';
import { CreateChannelUseCase } from 'src/domain/usecases';

export class DbCreateChannel implements CreateChannelUseCase {
  constructor(
    private readonly createChannelRepository: CreateChannelRepository,
    private readonly createUserChannelRepository: CreateUserChannelRepository,
  ) {}

  async create(parameters: CreateChannelUseCase.Parameters): Promise<CreateChannelUseCase.Result> {
    const channel: CreateChannelRepository.Parameters = {
      clientId: parameters.clientId,
      name: parameters.name,
      status: ChannelStatusEnum.ACTIVE,
      createdAt: new Date(),
    };

    const createdChannel = await this.createChannelRepository.create(channel);

    const usersInChannel: CreateUserChannelRepository.Parameters = parameters.users.map((userId) => ({
      userId,
      channelId: createdChannel.id,
      createdAt: new Date(),
      status: UserChannelStatusEnum.ACTIVE,
    }));

    await this.createUserChannelRepository.create(usersInChannel);

    return createdChannel;
  }
}
