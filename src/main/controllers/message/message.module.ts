import { Module } from '@nestjs/common';
import { BuildEmitMessageControllerFactory } from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { MessageController } from './message.controller';

@Module({
  imports: [FactoryModule],
  controllers: [MessageController],
  providers: [BuildEmitMessageControllerFactory],
})
export class MessageModule {}
