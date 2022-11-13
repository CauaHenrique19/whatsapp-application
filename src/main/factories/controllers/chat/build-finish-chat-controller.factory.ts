import { FinishChatUseCase, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { Controller } from 'src/presentation/protocols';
import { Inject } from '@nestjs/common';
import { FINISH_CHAT_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';
import { FinishChatController } from 'src/presentation/controllers/chat';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';

export class BuildFinishChatControllerFactory {
  constructor(
    @Inject(FINISH_CHAT_FACTORY) private readonly finishChat: FinishChatUseCase,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new FinishChatController(this.finishChat);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, this.loadUserByEmail, jwtAdapter);

    return authenticationProxy;
  }
}
