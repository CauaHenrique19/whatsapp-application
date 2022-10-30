import { Inject } from '@nestjs/common';
import { AuthenticationUseCase } from 'src/domain/usecases';
import { LoginController } from 'src/presentation/controllers/authentication';
import { Controller } from 'src/presentation/protocols';
import { AUTHENTICATION_FACTORY } from '../../providers';

export class BuildLoginControllerFactory {
  constructor(@Inject(AUTHENTICATION_FACTORY) private readonly authenticationUseCase: AuthenticationUseCase) {}

  public build(): Controller {
    return new LoginController(this.authenticationUseCase);
  }
}
