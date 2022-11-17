import { Module } from '@nestjs/common';
import { MultitonProvider } from 'src/infra/multiton';
import { AvaliationPrismaRepository } from 'src/infra/prisma/repositories/avaliation';
import { ChannelPrismaRepository } from 'src/infra/prisma/repositories/channel';
import { ChatLogPrismaRepository, ChatPrismaRepository } from 'src/infra/prisma/repositories/chat';
import { ClientPrismaRepository } from 'src/infra/prisma/repositories/client';
import { MessagePrismaRepository } from 'src/infra/prisma/repositories/message';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { UserChannelPrismaRepository } from 'src/infra/prisma/repositories/user-channel';
import { PrismaTransactionManager } from 'src/infra/prisma/transaction-manager';
import { SocketIoAdapter } from 'src/infra/websocket/socket-io';
import { authenticationFactory, connectToWhatsappFactory } from './authentication';
import { createAvaliationFactory } from './avaliation';
import { createChannelFactory } from './channel';
import { attachChatToUserFactory, createChatFactory, finishChatFactory, getChatByIdFactory } from './chat';
import { createClientFactory } from './client/create-client.factory';
import { createMessageFactory, emitMessagesFactory } from './message';
import { createUserFactory, loadUserByEmailFactory } from './user';
import { createUserChannelFactory } from './user-channel';

@Module({
  providers: [
    SocketIoAdapter,

    MultitonProvider,

    //repositories
    ClientPrismaRepository,
    UserPrismaRepository,
    ChannelPrismaRepository,
    UserChannelPrismaRepository,
    ChatPrismaRepository,
    ChatLogPrismaRepository,
    MessagePrismaRepository,
    AvaliationPrismaRepository,

    //prismaTransactionManager
    PrismaTransactionManager,

    //whatsapp
    connectToWhatsappFactory,

    //client
    createClientFactory,

    //user
    createUserFactory,
    loadUserByEmailFactory,

    //authentication
    authenticationFactory,

    //channel
    createChannelFactory,

    //userChannel
    createUserChannelFactory,

    //messages
    emitMessagesFactory,
    createMessageFactory,

    //chat
    createChatFactory,
    attachChatToUserFactory,
    finishChatFactory,
    getChatByIdFactory,

    //avaliations
    createAvaliationFactory,
  ],
  exports: [
    //whatsapp
    connectToWhatsappFactory,

    //client
    createClientFactory,

    //user
    createUserFactory,
    loadUserByEmailFactory,

    //authentication
    authenticationFactory,

    //channel
    createChannelFactory,

    //userChannel
    createUserChannelFactory,

    //messages
    emitMessagesFactory,
    createMessageFactory,

    //chat
    createChatFactory,
    attachChatToUserFactory,
    finishChatFactory,
    getChatByIdFactory,

    //avaliations
    createAvaliationFactory,
  ],
})
export class FactoryModule {}
