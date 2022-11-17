import { ChatStatusEnum, ChatStatusLabelEnum, ChatLogTypeActionEnum } from 'src/data/enums';
import { GetChatByIdRepository } from 'src/data/protocols/db';
import { GetChatByIdUseCase } from 'src/domain/usecases';

export class DbGetChatById implements GetChatByIdUseCase {
  constructor(private readonly getChatByIdRepository: GetChatByIdRepository) {}

  async getById(parameters: GetChatByIdUseCase.Parameters): Promise<GetChatByIdUseCase.Result> {
    const chat = await this.getChatByIdRepository.getById(parameters);
    const formattedChat = await this.formatData(chat);
    return formattedChat;
  }

  async formatData(chat: GetChatByIdRepository.Result): Promise<GetChatByIdUseCase.Result> {
    const chatStatusEnum = ChatStatusEnum[chat.status];
    const chatStatusLabel = ChatStatusLabelEnum[chatStatusEnum];

    const formatter = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    const labelsActionType = {
      [ChatLogTypeActionEnum.CREATED]: () => 'Chat Criado',
      [ChatLogTypeActionEnum.DIRECTED_TO_CHANNEL]: (log) => `Chat direcionado para o canal ${log.channel.name}`,
      [ChatLogTypeActionEnum.SELECTED_BY_USER]: (log) => `Selecionado pelo usuário ${log.user.name} ${log.user.lastName}`,
      [ChatLogTypeActionEnum.FINISHED]: (log) => `Finalizado pelo usuário ${log.user.name} ${log.user.lastName}`,
      [ChatLogTypeActionEnum.RESTARTED]: () => 'Chat Reiniciado',
    };

    return {
      id: chat.id,
      numberParticipant: chat.numberParticipant,
      userId: chat.userId,
      channelId: chat.channelId,
      status: chat.status,
      statusLabel: chatStatusLabel,
      channel: chat.channel
        ? {
            id: chat.channel.id,
            clientId: chat.channel.clientId,
            name: chat.channel.name,
            description: chat.channel.description,
            status: chat.channel.status,
            createdAt: chat.channel.createdAt,
            formattedCreatedAt: formatter.format(chat.channel.createdAt),
          }
        : null,
      chatLog: chat.chatLog.map((log) => ({
        id: log.id,
        chatId: log.chatId,
        userId: log.userId,
        actionType: log.actionType,
        actionTypeLabel: labelsActionType[log.actionType](log),
        createdAt: log.createdAt,
        formattedCreatedAt: formatter.format(log.createdAt),
      })),
    };
  }
}
