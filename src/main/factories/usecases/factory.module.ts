import { Module } from '@nestjs/common';
import { MultitonProvider } from 'src/infra/multiton';
import { ClientPrismaRepository } from 'src/infra/prisma/repositories/client';
import { connectToWhatsappFactory } from './authentication';
import { createClientFactory } from './client/create-client.factory';

@Module({
  providers: [
    MultitonProvider,

    //repositories
    ClientPrismaRepository,

    //whatsapp
    connectToWhatsappFactory,

    //client
    createClientFactory,
  ],
  exports: [
    //whatsapp
    connectToWhatsappFactory,

    //client
    createClientFactory,
  ],
})
export class FactoryModule {}
