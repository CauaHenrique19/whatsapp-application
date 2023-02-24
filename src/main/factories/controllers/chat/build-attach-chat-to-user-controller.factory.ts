import { AttachChatToUserUseCase } from 'src/domain/usecases';
import { Controller } from 'src/presentation/protocols';
import { Inject } from '@nestjs/common';
import { ATTACH_CHAT_TO_USER_FACTORY, AUTHENTICATION_PROXY_FACTORY } from 'src/main/factories/providers';
import { AttachChatToUserController } from 'src/presentation/controllers/chat';
import { AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildAttachChatToUserControllerFactory {
  constructor(
    @Inject(ATTACH_CHAT_TO_USER_FACTORY) private readonly attachChatToUser: AttachChatToUserUseCase,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new AttachChatToUserController(this.attachChatToUser);
    const authenticationProxy = this.authenticationProxyFactory(controller);

    return authenticationProxy;
  }
}
