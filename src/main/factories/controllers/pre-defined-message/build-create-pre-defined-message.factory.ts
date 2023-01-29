import { Inject } from '@nestjs/common';
import { CreatePreDefinedMessage, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { CreatePreDefinedMessageControler } from 'src/presentation/controllers/pre-defined-message';
import { Controller } from 'src/presentation/protocols';
import { CREATE_PRE_DEFINED_MESSAGE_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';

export class BuildCreatePreDefinedMessageControllerFactory {
  constructor(
    @Inject(CREATE_PRE_DEFINED_MESSAGE_FACTORY) private readonly createPreDefinedMessage: CreatePreDefinedMessage,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new CreatePreDefinedMessageControler(this.createPreDefinedMessage);

    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, this.loadUserByEmail, jwtAdapter);

    return authenticationProxy;
  }
}
