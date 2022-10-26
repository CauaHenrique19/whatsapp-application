import { ConnectGateway } from './connect.gateway';
import { Module } from '@nestjs/common';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { BuildConnectToWhatsappGatewayFactory } from 'src/main/factories/gateways/authentication';

@Module({
  imports: [FactoryModule],
  providers: [ConnectGateway, BuildConnectToWhatsappGatewayFactory],
})
export class ConnectModule {}
