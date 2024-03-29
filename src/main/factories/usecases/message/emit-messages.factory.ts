import { Provider } from '@nestjs/common';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { EmitMessages } from 'src/data/usecases/message';
import { EmitMessagesUseCase } from 'src/domain/usecases';
import { Multiton } from 'src/infra/multiton';
import { AvaliationPrismaRepository } from 'src/infra/prisma/repositories/avaliation';
import { ChannelPrismaRepository } from 'src/infra/prisma/repositories/channel';
import { ChatLogPrismaRepository, ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { MessagePrismaRepository } from 'src/infra/prisma/repositories/message';
import { SocketIoAdapter } from 'src/infra/websocket/socket-io';
import { EMIT_MESSAGES_FACTORY } from '../../providers';

export const emitMessagesFactory: Provider = {
  provide: EMIT_MESSAGES_FACTORY,
  useFactory: (
    multitonProvider: MultitonInterface<WhatsappClientInterface>,
    socketIoAdapter: SocketIoAdapter,
    chatRepository: ChatPrismaRepository,
    channelPrismaRepository: ChannelPrismaRepository,
    chatLogRepository: ChatLogPrismaRepository,
    messageRepository: MessagePrismaRepository,
    avaliationRepository: AvaliationPrismaRepository,
  ): EmitMessagesUseCase => {
    return new EmitMessages(
      multitonProvider,
      socketIoAdapter,
      chatRepository,
      chatRepository,
      chatRepository,
      channelPrismaRepository,
      chatLogRepository,
      messageRepository,
      messageRepository,
      messageRepository,
      avaliationRepository,
    );
  },
  inject: [
    Multiton,
    SocketIoAdapter,
    ChatPrismaRepository,
    ChannelPrismaRepository,
    ChatLogPrismaRepository,
    MessagePrismaRepository,
    AvaliationPrismaRepository,
  ],
};
