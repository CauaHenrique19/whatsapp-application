import { Inject } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/usecases';
import { CreateUserController } from 'src/presentation/controllers/user';
import { Controller } from 'src/presentation/protocols';
import { CREATE_USER_FACTORY } from '../../providers';

export class BuildCreateUserControllerFactory {
  constructor(@Inject(CREATE_USER_FACTORY) private readonly createUserUseCase: CreateUserUseCase) {}

  public build(): Controller {
    return new CreateUserController(this.createUserUseCase);
  }
}
