import { Module } from '@nestjs/common';
import { ConnectModule } from './gateways';

@Module({
  imports: [ConnectModule],
})
export class AppModule {}
