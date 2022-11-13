import { ChatLogTypeActionEnum, ChatStatusEnum } from 'src/data/enums';
import { CreateChatLogRepository, UpdateChatRepository } from 'src/data/protocols/db';
import { AttachChatToUserUseCase } from 'src/domain/usecases';

export class DbAttachChatToUser implements AttachChatToUserUseCase {
  constructor(
    private readonly updateChatRepository: UpdateChatRepository,
    private readonly createChatLogRepository: CreateChatLogRepository,
  ) {}

  async attachToUser(parameters: AttachChatToUserUseCase.Parameters): Promise<AttachChatToUserUseCase.Result> {
    const chat: UpdateChatRepository.Parameters = {
      id: parameters.chatId,
      userId: parameters.userId,
      status: ChatStatusEnum.IN_PROGRESS,
    };

    await this.createChatLogRepository.create([
      {
        chatId: chat.id,
        actionType: ChatLogTypeActionEnum.SELECTED_BY_USER,
        userId: parameters.userId,
        createdAt: new Date(),
      },
    ]);

    return await this.updateChatRepository.update(chat);
  }
}
