import { ConnectGateway } from './connect.gateway';
import { Module } from '@nestjs/common';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { BuildConnectToWhatsappGatewayFactory } from 'src/main/factories/gateways/authentication';
import { BuildEmitMessageGatewayFactory } from 'src/main/factories/gateways/message';

@Module({
  imports: [FactoryModule],
  providers: [ConnectGateway, BuildConnectToWhatsappGatewayFactory, BuildEmitMessageGatewayFactory],
})
export class ConnectModule {}
