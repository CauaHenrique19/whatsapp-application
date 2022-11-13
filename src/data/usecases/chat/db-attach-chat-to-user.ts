import { ChatLogTypeActionEnum, ChatStatusEnum } from 'src/data/enums';
import { CreateChatLogRepository, GetChatByIdRepository, UpdateChatRepository } from 'src/data/protocols/db';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { AttachChatToUserUseCase } from 'src/domain/usecases';

export class DbAttachChatToUser implements AttachChatToUserUseCase {
  constructor(
    private readonly updateChatRepository: UpdateChatRepository,
    private readonly createChatLogRepository: CreateChatLogRepository,
    private readonly getChatByIdRepository: GetChatByIdRepository,
    private readonly multiton: MultitonInterface<WhatsappClientInterface>,
  ) {}

  async attachToUser(parameters: AttachChatToUserUseCase.Parameters): Promise<AttachChatToUserUseCase.Result> {
    const loadedChat = await this.getChatByIdRepository.getById({ id: parameters.chatId });

    const chat: UpdateChatRepository.Parameters = {
      id: parameters.chatId,
      userId: parameters.user.id,
      status: ChatStatusEnum.IN_PROGRESS,
    };

    await this.createChatLogRepository.create([
      {
        chatId: chat.id,
        actionType: ChatLogTypeActionEnum.SELECTED_BY_USER,
        userId: parameters.user.id,
        createdAt: new Date(),
      },
    ]);

    const { instance: client } = await this.multiton.getInstance(parameters.user.clientId);
    await client.sendMessage(
      loadedChat.numberParticipant,
      `Seu atendimento foi direcionado ao atendente: ${parameters.user.name} ${parameters.user.lastName}`,
    );

    return await this.updateChatRepository.update(chat);
  }
}
