import { Module } from '@nestjs/common';
import { ClientModule } from './controllers/client/client.module';
import { ConnectModule } from './gateways';

@Module({
  imports: [ConnectModule, ClientModule],
})
export class AppModule {}
