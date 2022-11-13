import { ChatLogTypeActionEnum, ChatStatusEnum } from 'src/data/enums';
import { CreateChatLogRepository, UpdateChatRepository, GetChatByIdRepository } from 'src/data/protocols/db';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { FinishChatUseCase } from 'src/domain/usecases';

export class DbFinishChat implements FinishChatUseCase {
  constructor(
    private readonly updateChatRepository: UpdateChatRepository,
    private readonly createChatLogRepository: CreateChatLogRepository,
    private readonly getChatByIdRepository: GetChatByIdRepository,
    private readonly multiton: MultitonInterface<WhatsappClientInterface>,
  ) {}

  async finish(parameters: FinishChatUseCase.Parameters): Promise<FinishChatUseCase.Result> {
    const loadedChat = await this.getChatByIdRepository.getById({ id: parameters.chatId });

    if (!loadedChat) {
      //todo
    }

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

    const { instance: client } = await this.multiton.getInstance(parameters.clientId);
    await client.sendMessage(
      loadedChat.numberParticipant,
      `Seu atendimento foi finalizado, a partir desse momento qualquer mensagem enviada iniciará um novo atendimento. Tenha um ótimo dia!`,
    );

    return await this.updateChatRepository.update(chat);
  }
}
