import { Module } from '@nestjs/common';
import { BuildCreateUserChannelControllerFactory } from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { UserChannelController } from './user-channel.controller';

@Module({
  imports: [FactoryModule],
  controllers: [UserChannelController],
  providers: [BuildCreateUserChannelControllerFactory],
})
export class UserChannelModule {}
