import { Module } from '@nestjs/common';
import { BuildCreateUserControllerFactory } from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { UserController } from './user.controller';

@Module({
  imports: [FactoryModule],
  controllers: [UserController],
  providers: [BuildCreateUserControllerFactory],
})
export class UserModule {}
