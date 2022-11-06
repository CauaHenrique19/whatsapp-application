import { UserChannelStatusEnum } from 'src/data/enums';
import { CreateUserChannelRepository } from 'src/data/protocols/db/user-channel';
import { CreateUserChannelUseCase } from 'src/domain/usecases';

export class DbCreateUserChannel implements CreateUserChannelUseCase {
  constructor(private readonly createUserChannelRepository: CreateUserChannelRepository) {}

  async create(parameters: CreateUserChannelUseCase.Parameters): Promise<CreateUserChannelUseCase.Result> {
    const userChannel: CreateUserChannelRepository.Parameters = parameters.map((parameter) => ({
      channelId: parameter.channelId,
      userId: parameter.userId,
      status: UserChannelStatusEnum.ACTIVE,
      createdAt: new Date(),
    }));

    await this.createUserChannelRepository.create(userChannel);
  }
}
