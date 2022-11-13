import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { Module } from '@nestjs/common';
import { BuildAttachChatToUserControllerFactory, BuildFinishChatControllerFactory } from 'src/main/factories/controllers';
import { ChatController } from './chat.controller';

@Module({
  imports: [FactoryModule],
  controllers: [ChatController],
  providers: [BuildAttachChatToUserControllerFactory, BuildFinishChatControllerFactory],
})
export class ChatModule {}
