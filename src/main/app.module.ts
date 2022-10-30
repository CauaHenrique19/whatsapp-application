import { Module } from '@nestjs/common';
import { AuthenticationModule } from './controllers/authentication/authentication.module';
import { ClientModule } from './controllers/client/client.module';
import { UserModule } from './controllers/user/user.module';
import { ConnectModule } from './gateways';

@Module({
  imports: [ConnectModule, ClientModule, UserModule, AuthenticationModule],
})
export class AppModule {}
