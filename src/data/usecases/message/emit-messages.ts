import { ChatStatusEnum, WebsocketEventsEnum } from 'src/data/enums';
import { CreateChatRepository, GetChatByNumberParticipantRepository, UpdateChatRepository } from 'src/data/protocols/db';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WebsocketInterface } from 'src/data/protocols/websocket';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { ChatModel, WhatsappMessageModel } from 'src/domain/models';
import { EmitMessagesUseCase } from 'src/domain/usecases';

export class EmitMessages implements EmitMessagesUseCase {
  constructor(
    private readonly multiton: MultitonInterface<WhatsappClientInterface>,
    private readonly websocketAdapter: WebsocketInterface,
    private readonly getChatByNumberParticipantRepository: GetChatByNumberParticipantRepository,
    private readonly createChatRepository: CreateChatRepository,
    private readonly updateChatRepository: UpdateChatRepository,
  ) {}

  async emit(parameters: EmitMessagesUseCase.Parameters): Promise<EmitMessagesUseCase.Result> {
    const { clientId } = parameters;

    const client = await this.multiton.getInstance(clientId);
    client.instance.onMessage(async (message) => {
      const numberParticipant = message.from;
      const chat = await this.getChatByNumberParticipantRepository.getByNumberParticipant({ number: numberParticipant });

      let finalChat: ChatModel = chat;

      if (chat) {
        if (chat.status === ChatStatusEnum.FINISHED) {
          chat.userId = null;
          chat.status = ChatStatusEnum.WAITING_USER;

          finalChat = await this.updateChatRepository.update(chat);
          //SEND AUTOMATIC MESSAGE
        }
      } else {
        const chat: ChatModel = {
          numberParticipant: numberParticipant,
          status: ChatStatusEnum.WAITING_USER,
        };

        finalChat = await this.createChatRepository.create(chat);
        //SEND AUTOMATIC MESSAGE
      }

      //SAVE RECEIVED MESSAGE
      console.log(finalChat);
      this.websocketAdapter.emitEvent<WhatsappMessageModel>(WebsocketEventsEnum.NEW_MESSAGE, message);
    });

    let result = true;

    if (!client) {
      result = false;
    }

    return result;
  }
}
