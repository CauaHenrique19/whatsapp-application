import { Inject } from '@nestjs/common';
import { CreateMessageUseCase } from 'src/domain/usecases';
import { CreateMessageController } from 'src/presentation/controllers/message';
import { Controller } from 'src/presentation/protocols';
import { AUTHENTICATION_PROXY_FACTORY, CREATE_MESSAGE_FACTORY } from 'src/main/factories/providers';
import { AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildCreateMessageControllerFactory {
  constructor(
    @Inject(CREATE_MESSAGE_FACTORY) private readonly createMessageUseCase: CreateMessageUseCase,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new CreateMessageController(this.createMessageUseCase);
    const authenticationProxy = this.authenticationProxyFactory(controller);

    return authenticationProxy;
  }
}
