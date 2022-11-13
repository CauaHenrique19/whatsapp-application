import { ChatLogTypeActionEnum, ChatStatusEnum, WebsocketEventsEnum } from 'src/data/enums';
import {
  CreateChatLogRepository,
  CreateChatRepository,
  GetChannelsByClientIdRepository,
  GetChatByNumberParticipantRepository,
  UpdateChatRepository,
} from 'src/data/protocols/db';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WebsocketInterface } from 'src/data/protocols/websocket';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { ChatModel, WhatsappList, WhatsappMessageModel, WhatsappSection } from 'src/domain/models';
import { EmitMessagesUseCase } from 'src/domain/usecases';

export class EmitMessages implements EmitMessagesUseCase {
  constructor(
    private readonly multiton: MultitonInterface<WhatsappClientInterface>,
    private readonly websocketAdapter: WebsocketInterface,
    private readonly getChatByNumberParticipantRepository: GetChatByNumberParticipantRepository,
    private readonly createChatRepository: CreateChatRepository,
    private readonly updateChatRepository: UpdateChatRepository,
    private readonly getChannelsByClientIdRepository: GetChannelsByClientIdRepository,
    private readonly createChatLogRepository: CreateChatLogRepository,
  ) {}

  async emit(parameters: EmitMessagesUseCase.Parameters): Promise<EmitMessagesUseCase.Result> {
    const { clientId } = parameters;

    const { instance: client } = await this.multiton.getInstance(clientId);
    const channels = await this.getChannelsByClientIdRepository.getByClientId({ clientId });

    client.onMessage(async (message) => {
      const numberParticipant = message.from;
      const chat = await this.getChatByNumberParticipantRepository.getByNumberParticipant({ number: numberParticipant });

      let finalChat: ChatModel | GetChatByNumberParticipantRepository.Result = chat;
      let rooms: string[] = [];

      const idSelectedChannel = parseInt(message.selectedRowId);
      const chatHasDirectedToChannel = chat.channelId;

      if (idSelectedChannel && !chatHasDirectedToChannel) {
        const channel = channels.find((channel) => channel.id === idSelectedChannel);
        chat.channelId = idSelectedChannel;
        chat.status = ChatStatusEnum.WAITING_USER;

        const chatToUpdate = chat;
        delete chatToUpdate.user;

        finalChat = await this.updateChatRepository.update(chatToUpdate);
        await this.createChatLogRepository.create([
          {
            chatId: finalChat.id,
            actionType: ChatLogTypeActionEnum.DIRECTED_TO_CHANNEL,
            channelId: idSelectedChannel,
            createdAt: new Date(),
          },
        ]);

        await client.sendMessage(
          numberParticipant,
          `✅ Você será redirecionado para o canal de ${channel.name}, e um dos nossos atendentes irá lhe atender em breve.`,
        );

        const emailsOfUsersToReceiveMessage = channel.users.map((channel) => channel.email);
        rooms = emailsOfUsersToReceiveMessage;
      } else if (idSelectedChannel && chatHasDirectedToChannel) {
        await client.sendMessage(numberParticipant, `❌ Você já foi redirecionado a um canal. Aguarde para ser atendido!`);
      }

      if (numberParticipant === '5521990206939@c.us' && chatHasDirectedToChannel && chat.user) {
        const user = chat.user;
        rooms = [user.email];
      }

      if (chat && numberParticipant === '5521990206939@c.us') {
        if (chat.status === ChatStatusEnum.FINISHED) {
          chat.userId = null;
          chat.status = ChatStatusEnum.WAITING_CHANNEL;

          const chatToUpdate = chat;
          delete chatToUpdate.user;

          finalChat = await this.updateChatRepository.update(chat);
          await this.createChatLogRepository.create([
            {
              chatId: finalChat.id,
              actionType: ChatLogTypeActionEnum.RESTARTED,
              createdAt: new Date(),
            },
          ]);
          await this.sendSelectChannelAutomaticMessage(numberParticipant, channels, client);
        }
      } else if (numberParticipant === '5521990206939@c.us') {
        const chat: ChatModel = {
          numberParticipant: numberParticipant,
          status: ChatStatusEnum.WAITING_CHANNEL,
        };

        finalChat = await this.createChatRepository.create(chat);
        await this.createChatLogRepository.create([
          {
            chatId: finalChat.id,
            actionType: ChatLogTypeActionEnum.CREATED,
            createdAt: new Date(),
          },
        ]);
        await this.sendSelectChannelAutomaticMessage(numberParticipant, channels, client);
      }

      if (finalChat.status === ChatStatusEnum.WAITING_USER) {
        const channel = channels.find((channel) => channel.id === finalChat.channelId);
        const emailsOfUsersToReceiveMessage = channel.users.map((channel) => channel.email);
        rooms = emailsOfUsersToReceiveMessage;
      }

      //SAVE RECEIVED MESSAGE
      this.websocketAdapter.emitEventToRooms<WhatsappMessageModel>(rooms, WebsocketEventsEnum.NEW_MESSAGE, message);
    });

    let result = true;

    if (!client) {
      result = false;
    }

    return result;
  }

  async sendSelectChannelAutomaticMessage(
    number: string,
    channels: GetChannelsByClientIdRepository.Result,
    client: WhatsappClientInterface,
  ) {
    const rowsSections = channels.map((channel) => {
      return {
        id: channel.id.toString(),
        title: channel.name,
        description: channel.description,
      };
    });

    const text = `👋 Olá Fulano de Tal, Tudo Bem? Esperamos que sim!
    \nPara continuarmos o seu atendimento será necessário que você selecione o canal relacionado ao seu atendimento.
    \nLembrando que sua resposta só será computada se você selecionar uma das opções na lista abaixo.`;

    let sections: WhatsappSection[] = [
      {
        title: 'Selecione o canal desejado.',
        rows: rowsSections,
      },
    ];

    const list: WhatsappList = {
      body: text,
      buttonText: 'Visualizar Canais',
      sections,
      title: 'Triagem',
      footer: 'Esta é uma mensagem automática.',
    };

    await client.sendMessage(number, list);
  }
}
