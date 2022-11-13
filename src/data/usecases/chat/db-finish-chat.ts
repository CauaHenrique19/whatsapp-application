import { ChatLogTypeActionEnum, ChatStatusEnum } from 'src/data/enums';
import { CreateChatLogRepository, UpdateChatRepository } from 'src/data/protocols/db';
import { FinishChatUseCase } from 'src/domain/usecases';

export class DbFinishChat implements FinishChatUseCase {
  constructor(
    private readonly updateChatRepository: UpdateChatRepository,
    private readonly createChatLogRepository: CreateChatLogRepository,
  ) {}

  async finish(parameters: FinishChatUseCase.Parameters): Promise<FinishChatUseCase.Result> {
    const chat: UpdateChatRepository.Parameters = {
      id: parameters.chatId,
      status: ChatStatusEnum.FINISHED,
      channelId: null,
    };

    await this.createChatLogRepository.create([
      {
        chatId: chat.id,
        actionType: ChatLogTypeActionEnum.FINISHED,
        userId: parameters.userId,
        createdAt: new Date(),
      },
    ]);

    return await this.updateChatRepository.update(chat);
  }
}
