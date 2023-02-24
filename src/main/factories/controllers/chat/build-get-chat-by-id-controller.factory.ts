import { Inject } from '@nestjs/common';
import { GetChatByIdUseCase } from 'src/domain/usecases';
import { GetChatByIdController } from 'src/presentation/controllers/chat';
import { Controller } from 'src/presentation/protocols';
import { AUTHENTICATION_PROXY_FACTORY, GET_CHAT_BY_ID_FACTORY } from 'src/main/factories/providers';
import { AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildGetChatByIdControllerFactory {
  constructor(
    @Inject(GET_CHAT_BY_ID_FACTORY) private readonly getChatByIdUseCase: GetChatByIdUseCase,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new GetChatByIdController(this.getChatByIdUseCase);
    const authenticationProxy = this.authenticationProxyFactory(controller);

    return authenticationProxy;
  }
}
