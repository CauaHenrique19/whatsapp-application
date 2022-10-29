import { ClientController } from './client.controller';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { Module } from '@nestjs/common';
import { BuildCreateClientControllerFactory } from 'src/main/factories/controllers';

@Module({
  imports: [FactoryModule],
  controllers: [ClientController],
  providers: [BuildCreateClientControllerFactory],
})
export class ClientModule {}
