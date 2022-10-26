import { Module } from '@nestjs/common';
import { MultitonProvider } from 'src/infra/multiton';
import { connectToWhatsappFactory } from './authentication';

@Module({
  providers: [
    MultitonProvider,

    //usecases
    connectToWhatsappFactory,
  ],
  exports: [connectToWhatsappFactory],
})
export class FactoryModule {}
