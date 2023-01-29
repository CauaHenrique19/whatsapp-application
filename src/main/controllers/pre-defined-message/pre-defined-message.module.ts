import { Module } from '@nestjs/common';
import { BuildCreatePreDefinedMessageControllerFactory } from 'src/main/factories/controllers/pre-defined-message';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { PreDefinedMessageController } from './pre-defined-message.controller';

@Module({
  imports: [FactoryModule],
  controllers: [PreDefinedMessageController],
  providers: [BuildCreatePreDefinedMessageControllerFactory],
})
export class PreDefinedMessageModule {}
