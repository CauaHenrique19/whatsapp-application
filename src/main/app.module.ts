import { Module } from '@nestjs/common';
import { AuthenticationModule } from './controllers/authentication/authentication.module';
import { ChannelModule } from './controllers/channel/channel.module';
import { ChatModule } from './controllers/chat/chat.module';
import { ClientModule } from './controllers/client/client.module';
import { MessageModule } from './controllers/message/message.module';
import { PreDefinedMessageModule } from './controllers/pre-defined-message/pre-defined-message.module';
import { UserChannelModule } from './controllers/user-channel/user-channel.module';
import { UserModule } from './controllers/user/user.module';

@Module({
  imports: [
    ClientModule,
    UserModule,
    AuthenticationModule,
    ChannelModule,
    UserChannelModule,
    MessageModule,
    ChatModule,
    PreDefinedMessageModule,
  ],
})
export class AppModule {}
