import { FinishChatUseCase } from 'src/domain/usecases';
import { Controller } from 'src/presentation/protocols';
import { Inject } from '@nestjs/common';
import { AUTHENTICATION_PROXY_FACTORY, FINISH_CHAT_FACTORY } from 'src/main/factories/providers';
import { FinishChatController } from 'src/presentation/controllers/chat';
import { AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildFinishChatControllerFactory {
  constructor(
    @Inject(FINISH_CHAT_FACTORY) private readonly finishChat: FinishChatUseCase,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new FinishChatController(this.finishChat);
    const authenticationProxy = this.authenticationProxyFactory(controller);

    return authenticationProxy;
  }
}
