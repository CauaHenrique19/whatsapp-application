import { Module } from '@nestjs/common';
import { MultitonProvider } from 'src/infra/multiton';
import { ClientPrismaRepository } from 'src/infra/prisma/repositories/client';
import { UserPrismaRepository } from 'src/infra/prisma/repositories/user';
import { connectToWhatsappFactory } from './authentication';
import { createClientFactory } from './client/create-client.factory';
import { createUserFactory } from './user';

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
  ],
  exports: [
    //whatsapp
    connectToWhatsappFactory,

    //client
    createClientFactory,

    //user
    createUserFactory,
  ],
})
export class FactoryModule {}
