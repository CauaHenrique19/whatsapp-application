import { ChatLogTypeActionEnum, ChatStatusEnum, WebsocketEventsEnum } from 'src/data/enums';
import {
  CreateAvaliationRepository,
  CreateChatLogRepository,
  CreateChatRepository,
  CreateMessageRepository,
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
    private readonly createMessageRepository: CreateMessageRepository,
    private readonly createAvaliationRepository: CreateAvaliationRepository,
  ) {}

  async emit(parameters: EmitMessagesUseCase.Parameters): Promise<EmitMessagesUseCase.Result> {
    const { clientId } = parameters;

    const { instance: client } = await this.multiton.getInstance(clientId);
    const channels = await this.getChannelsByClientIdRepository.getByClientId({ clientId });

    client.onMessage(async (message) => {
      const numberParticipant = message.from;
      const allowedNumbers = ['5521990206939@c.us', '5521988382114@c.us', '5521979392818@c.us', '5521980284254@c.us'];
      const numberAllowed = allowedNumbers.includes(numberParticipant);

      const chat = await this.getChatByNumberParticipantRepository.getByNumberParticipant({ number: numberParticipant });

      let finalChat: ChatModel | GetChatByNumberParticipantRepository.Result = chat;
      let rooms: string[] = [];

      const isResponseOfList = !!message.selectedRowId;
      const idSelectedChannel = parseInt(message.selectedRowId);
      const selectedNote =
        message.selectedRowId?.includes('_') && parseInt(message.selectedRowId?.substring(message.selectedRowId?.indexOf('_') + 1));
      const chatHasDirectedToChannel = chat?.channelId;

      if (chat && numberAllowed && !isResponseOfList) {
        if (chat.status === ChatStatusEnum.FINISHED) {
          const returnedChat = await this.restartChat(chat, channels, client);
          finalChat = returnedChat;
        }
      } else if (numberAllowed && !isResponseOfList) {
        const returnedChat = await this.startChat(numberParticipant, channels, client);
        finalChat = returnedChat;
      }

      if (!selectedNote && idSelectedChannel && !chatHasDirectedToChannel) {
        const { rooms: returnedRooms, chat: returnedChat } = await this.registerAnswerOfMessageOfSelectChannel(
          idSelectedChannel,
          chat,
          channels,
          client,
        );

        rooms = returnedRooms;
        finalChat = returnedChat;
      } else if (idSelectedChannel && chatHasDirectedToChannel) {
        await client.sendMessage(numberParticipant, `❌ Você já foi redirecionado a um canal. Aguarde para ser atendido!`);
      } else if (selectedNote) {
        //register avaliation
        const avaliation = {
          userId: chat.userId,
          chatId: chat.id,
          note: selectedNote,
          createdAt: new Date(),
        };

        const createdAvaliation = await this.createAvaliationRepository.create(avaliation);
        await this.createChatLogRepository.create([
          {
            chatId: finalChat.id,
            avaliationId: createdAvaliation.id,
            actionType: ChatLogTypeActionEnum.AVALIATED,
            createdAt: new Date(),
          },
        ]);
        await client.sendMessage(numberParticipant, 'Obrigado pela avaliação!');
      }

      if (numberAllowed && chatHasDirectedToChannel && chat.user) {
        const user = chat.user;
        rooms = [user.email];
      }

      if (finalChat?.status === ChatStatusEnum.WAITING_USER) {
        const channel = channels.find((channel) => channel.id === finalChat.channelId);
        const emailsOfUsersToReceiveMessage = channel.users.map((channel) => channel.email);
        rooms = emailsOfUsersToReceiveMessage;
      }

      await this.createMessageRepository.create({
        chatId: finalChat.id,
        content: message.content,
        createdAt: message.time,
        fromParticipant: true,
        userId: finalChat.userId,
        whatsappMessageId: message.id,
      });
      this.websocketAdapter.emitEventToRooms<WhatsappMessageModel>(rooms, WebsocketEventsEnum.NEW_MESSAGE, message);
    });

    let result = true;

    if (!client) {
      result = false;
    }

    return result;
  }

  async startChat(
    numberParticipant: string,
    channels: GetChannelsByClientIdRepository.Result,
    client: WhatsappClientInterface,
  ): Promise<ChatModel> {
    const chat: ChatModel = {
      numberParticipant: numberParticipant,
      status: ChatStatusEnum.WAITING_CHANNEL,
    };

    const createdChat = await this.createChatRepository.create(chat);
    await this.createChatLogRepository.create([
      {
        chatId: createdChat.id,
        actionType: ChatLogTypeActionEnum.CREATED,
        createdAt: new Date(),
      },
    ]);

    await this.sendSelectChannelAutomaticMessage(numberParticipant, channels, client);
    return createdChat;
  }

  async restartChat(
    chat: GetChatByNumberParticipantRepository.Result,
    channels: GetChannelsByClientIdRepository.Result,
    client: WhatsappClientInterface,
  ): Promise<ChatModel> {
    chat.userId = null;
    chat.status = ChatStatusEnum.WAITING_CHANNEL;

    const chatToUpdate = chat;
    delete chatToUpdate.user;

    const updatedChat = await this.updateChatRepository.update(chat);
    await this.createChatLogRepository.create([
      {
        chatId: updatedChat.id,
        actionType: ChatLogTypeActionEnum.RESTARTED,
        createdAt: new Date(),
      },
    ]);

    await this.sendSelectChannelAutomaticMessage(updatedChat.numberParticipant, channels, client);
    return updatedChat;
  }

  async registerAnswerOfMessageOfSelectChannel(
    idSelectedChannel: number,
    chat: GetChatByNumberParticipantRepository.Result,
    channels: GetChannelsByClientIdRepository.Result,
    client: WhatsappClientInterface,
  ): Promise<{ chat: ChatModel; rooms: string[] }> {
    const channel = channels.find((channel) => channel.id === idSelectedChannel);

    chat.channelId = idSelectedChannel;
    chat.status = ChatStatusEnum.WAITING_USER;

    const chatToUpdate = chat;
    delete chatToUpdate.user;

    const updatedChat = await this.updateChatRepository.update(chatToUpdate);
    await this.createChatLogRepository.create([
      {
        chatId: updatedChat.id,
        actionType: ChatLogTypeActionEnum.DIRECTED_TO_CHANNEL,
        channelId: idSelectedChannel,
        createdAt: new Date(),
      },
    ]);

    await client.sendMessage(
      updatedChat.numberParticipant,
      `✅ Você será redirecionado para o canal de ${channel.name}, e um dos nossos atendentes irá lhe atender em breve.`,
    );

    const emailsOfUsersToReceiveMessage = channel.users.map((channel) => channel.email);

    return {
      rooms: emailsOfUsersToReceiveMessage,
      chat: updatedChat,
    };
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
