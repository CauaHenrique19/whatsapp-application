import { ChatStatusEnum } from 'src/data/enums';
import { UpdateChatRepository } from 'src/data/protocols/db';
import { AttachChatToUserUseCase } from 'src/domain/usecases';

export class DbAttachChatToUser implements AttachChatToUserUseCase {
  constructor(private readonly updateChatRepository: UpdateChatRepository) {}

  async attachToUser(parameters: AttachChatToUserUseCase.Parameters): Promise<AttachChatToUserUseCase.Result> {
    const chat: UpdateChatRepository.Parameters = {
      id: parameters.id,
      userId: parameters.userId,
      status: ChatStatusEnum.IN_PROGRESS,
    };

    return await this.updateChatRepository.update(chat);
  }
}
