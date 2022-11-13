import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { Module } from '@nestjs/common';
import { BuildAttachChatToUserControllerFactory } from 'src/main/factories/controllers';
import { ChatController } from './chat.controller';

@Module({
  imports: [FactoryModule],
  controllers: [ChatController],
  providers: [BuildAttachChatToUserControllerFactory],
})
export class ChatModule {}
