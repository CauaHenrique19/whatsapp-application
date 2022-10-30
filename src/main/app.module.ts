import { Module } from '@nestjs/common';
import { ClientModule } from './controllers/client/client.module';
import { UserModule } from './controllers/user/user.module';
import { ConnectModule } from './gateways';

@Module({
  imports: [ConnectModule, ClientModule, UserModule],
})
export class AppModule {}
