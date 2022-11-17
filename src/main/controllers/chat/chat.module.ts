import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { Module } from '@nestjs/common';
import {
  BuildAttachChatToUserControllerFactory,
  BuildFinishChatControllerFactory,
  BuildGetChatByIdControllerFactory,
} from 'src/main/factories/controllers';
import { ChatController } from './chat.controller';

@Module({
  imports: [FactoryModule],
  controllers: [ChatController],
  providers: [BuildAttachChatToUserControllerFactory, BuildFinishChatControllerFactory, BuildGetChatByIdControllerFactory],
})
export class ChatModule {}
