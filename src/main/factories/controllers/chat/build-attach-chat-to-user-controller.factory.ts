import { AttachChatToUserUseCase } from 'src/domain/usecases';
import { Controller } from 'src/presentation/protocols';
import { Inject } from '@nestjs/common';
import { ATTACH_CHAT_TO_USER_FACTORY } from '../../providers';
import { AttachChatToUserController } from 'src/presentation/controllers/chat';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';

export class BuildAttachChatToUserControllerFactory {
  constructor(@Inject(ATTACH_CHAT_TO_USER_FACTORY) private readonly attachChatToUser: AttachChatToUserUseCase) {}

  public build(): Controller {
    const controller = new AttachChatToUserController(this.attachChatToUser);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, jwtAdapter);

    return authenticationProxy;
  }
}
