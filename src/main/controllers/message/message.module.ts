import { Module } from '@nestjs/common';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { MessageController } from './message.controller';
import { BuildEmitMessageGatewayFactory } from 'src/main/factories/gateways/message';

@Module({
  imports: [FactoryModule],
  controllers: [MessageController],
  providers: [BuildEmitMessageGatewayFactory],
})
export class MessageModule {}
