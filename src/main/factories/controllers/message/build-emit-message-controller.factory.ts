import { Inject } from '@nestjs/common';
import { EmitMessagesUseCase } from 'src/domain/usecases';
import { EmitMessagesController } from 'src/presentation/controllers/message';
import { Controller } from 'src/presentation/protocols';
import { EMIT_MESSAGES_FACTORY, AUTHENTICATION_PROXY_FACTORY } from 'src/main/factories/providers';
import { AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildEmitMessageControllerFactory {
  constructor(
    @Inject(EMIT_MESSAGES_FACTORY) private readonly emitMessages: EmitMessagesUseCase,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new EmitMessagesController(this.emitMessages);
    const authenticationProxy = this.authenticationProxyFactory(controller);

    return authenticationProxy;
  }
}
