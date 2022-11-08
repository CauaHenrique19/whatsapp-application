import { Module } from '@nestjs/common';
import { MultitonProvider } from 'src/infra/multiton';
import { ChannelPrismaRepository } from 'src/infra/prisma/repositories/channel';
import { ClientPrismaRepository } from 'src/infra/prisma/repositories/client';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { UserChannelPrismaRepository } from 'src/infra/prisma/repositories/user-channel';
import { PrismaTransactionManager } from 'src/infra/prisma/transaction-manager';
import { authenticationFactory, connectToWhatsappFactory } from './authentication';
import { createChannelFactory } from './channel';
import { createClientFactory } from './client/create-client.factory';
import { createUserFactory, loadUserByEmailFactory } from './user';
import { createUserChannelFactory } from './user-channel';

@Module({
  providers: [
    MultitonProvider,

    //repositories
    ClientPrismaRepository,
    UserPrismaRepository,
    ChannelPrismaRepository,
    UserChannelPrismaRepository,

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
  ],
})
export class FactoryModule {}
