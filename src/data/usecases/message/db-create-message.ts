import { MessageAckEnum } from 'src/data/enums';
import { CreateMessageRepository, GetChatByIdRepository } from 'src/data/protocols/db';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { CreateMessageUseCase } from 'src/domain/usecases';

export class DbCreateMessage implements CreateMessageUseCase {
  constructor(
    private readonly createMessageRepository: CreateMessageRepository,
    private readonly getChatByIdRepository: GetChatByIdRepository,
    private readonly multiton: MultitonInterface<WhatsappClientInterface>,
  ) {}

  async create(parameters: CreateMessageUseCase.Parameters): Promise<CreateMessageUseCase.Result> {
    const chat = await this.getChatByIdRepository.getById({ id: parameters.chatId });

    const { instance: client } = await this.multiton.getInstance(parameters.user.clientId);

    const templateMessage = `*${chat.channel.name} - ${parameters.user.name} ${parameters.user.lastName}*
    \n${parameters.content}`;

    const sendedMessage = await client.sendMessage(chat.numberParticipant, templateMessage);

    const messageToCreate: CreateMessageRepository.Parameters = {
      chatId: parameters.chatId,
      content: parameters.content,
      userId: parameters.user.id,
      fromParticipant: false,
      createdAt: new Date(),
      whatsappMessageId: sendedMessage.id,
      ack: MessageAckEnum.SENDED,
    };

    const message = await this.createMessageRepository.create(messageToCreate);

    return message;
  }
}
