import { Module } from '@nestjs/common';
import { BuildCreateChannelControllerFactory } from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { ChannelController } from './channel.controller';

@Module({
  imports: [FactoryModule],
  controllers: [ChannelController],
  providers: [BuildCreateChannelControllerFactory],
})
export class ChannelModule {}
