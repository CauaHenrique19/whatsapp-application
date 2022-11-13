import { ChannelStatusEnum, UserChannelStatusEnum } from 'src/data/enums';
import { CreateChannelRepository, CreateUserChannelRepository } from 'src/data/protocols/db';
import { TransactionManager } from 'src/data/protocols/transaction-manager';
import { CreateChannelUseCase } from 'src/domain/usecases';

export class DbCreateChannel implements CreateChannelUseCase {
  constructor(
    private readonly createChannelRepository: CreateChannelRepository,
    private readonly createUserChannelRepository: CreateUserChannelRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  async create(parameters: CreateChannelUseCase.Parameters): Promise<CreateChannelUseCase.Result> {
    const channel: CreateChannelRepository.Parameters = {
      clientId: parameters.clientId,
      name: parameters.name,
      status: ChannelStatusEnum.ACTIVE,
      description: parameters.description,
      createdAt: new Date(),
    };

    const createdChannel = await this.transactionManager.handleTransaction(async (transaction) => {
      const createdChannel = await this.createChannelRepository.create(channel, transaction);

      const usersInChannel: CreateUserChannelRepository.Parameters = parameters.users.map((userId) => ({
        userId,
        channelId: createdChannel.id,
        createdAt: new Date(),
        status: UserChannelStatusEnum.ACTIVE,
      }));

      await this.createUserChannelRepository.create(usersInChannel, transaction);

      return createdChannel;
    });

    return createdChannel;
  }
}
