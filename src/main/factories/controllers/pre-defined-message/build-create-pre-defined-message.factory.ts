import { Inject } from '@nestjs/common';
import { CreatePreDefinedMessage } from 'src/domain/usecases';
import { CreatePreDefinedMessageControler } from 'src/presentation/controllers/pre-defined-message';
import { Controller } from 'src/presentation/protocols';
import { AUTHENTICATION_PROXY_FACTORY, CREATE_PRE_DEFINED_MESSAGE_FACTORY } from 'src/main/factories/providers';
import { AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildCreatePreDefinedMessageControllerFactory {
  constructor(
    @Inject(CREATE_PRE_DEFINED_MESSAGE_FACTORY) private readonly createPreDefinedMessage: CreatePreDefinedMessage,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new CreatePreDefinedMessageControler(this.createPreDefinedMessage);
    const authenticationProxy = this.authenticationProxyFactory(controller);

    return authenticationProxy;
  }
}
