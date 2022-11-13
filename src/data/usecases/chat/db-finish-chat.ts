import { ChatStatusEnum } from 'src/data/enums';
import { UpdateChatRepository } from 'src/data/protocols/db';
import { FinishChatUseCase } from 'src/domain/usecases';

export class DbFinishChat implements FinishChatUseCase {
  constructor(private readonly updateChatRepository: UpdateChatRepository) {}

  async finish(parameters: FinishChatUseCase.Parameters): Promise<FinishChatUseCase.Result> {
    const chat: UpdateChatRepository.Parameters = {
      id: parameters.chatId,
      status: ChatStatusEnum.FINISHED,
      channelId: null,
    };

    return await this.updateChatRepository.update(chat);
  }
}
