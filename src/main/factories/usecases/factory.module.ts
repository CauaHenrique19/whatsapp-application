import { Module } from '@nestjs/common';
import { MultitonProvider } from 'src/infra/multiton';
import { ClientPrismaRepository } from 'src/infra/prisma/repositories/client';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { authenticationFactory, connectToWhatsappFactory } from './authentication';
import { createClientFactory } from './client/create-client.factory';
import { createUserFactory, loadUserByEmailFactory } from './user';

@Module({
  providers: [
    MultitonProvider,

    //repositories
    ClientPrismaRepository,
    UserPrismaRepository,

    //whatsapp
    connectToWhatsappFactory,

    //client
    createClientFactory,

    //user
    createUserFactory,
    loadUserByEmailFactory,

    //authentication
    authenticationFactory,
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
  ],
})
export class FactoryModule {}
