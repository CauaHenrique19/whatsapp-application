import { AuthenticationController } from './authentication.controller';
import { Module } from '@nestjs/common';
import { BuildLoginControllerFactory } from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';

@Module({
  imports: [FactoryModule],
  controllers: [AuthenticationController],
  providers: [BuildLoginControllerFactory],
})
export class AuthenticationModule {}
