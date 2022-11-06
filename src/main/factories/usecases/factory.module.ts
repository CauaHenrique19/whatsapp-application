import { Module } from '@nestjs/common';
import { MultitonProvider } from 'src/infra/multiton';
import { ChannelPrismaRepository } from 'src/infra/prisma/repositories/channel';
import { ClientPrismaRepository } from 'src/infra/prisma/repositories/client';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { authenticationFactory, connectToWhatsappFactory } from './authentication';
import { createChannelFactory } from './channel';
import { createClientFactory } from './client/create-client.factory';
import { createUserFactory, loadUserByEmailFactory } from './user';

@Module({
  providers: [
    MultitonProvider,

    //repositories
    ClientPrismaRepository,
    UserPrismaRepository,
    ChannelPrismaRepository,

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
  ],
})
export class FactoryModule {}
