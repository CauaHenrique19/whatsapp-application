import { GetPreDefinedMessageByUserIdRepository } from 'src/data/protocols/db';
import { GetPreDefinedMessageByUserId } from 'src/domain/usecases';

export class DbGetPreDefinedMessageByUserId implements GetPreDefinedMessageByUserId {
  constructor(private readonly getPreDefinedMessageByUserIdRepository: GetPreDefinedMessageByUserIdRepository) {}

  async getByUserId(parameters: GetPreDefinedMessageByUserId.Parameters): Promise<GetPreDefinedMessageByUserId.Result> {
    return await this.getPreDefinedMessageByUserIdRepository.getByUserId(parameters);
  }
}
