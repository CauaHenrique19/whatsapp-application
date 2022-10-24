import { ConnectGateway } from './connect.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [ConnectGateway],
})
export class ConnectModule {}
