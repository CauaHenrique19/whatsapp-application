import { Inject } from '@nestjs/common';
import { GetChatByIdUseCase, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { GetChatByIdController } from 'src/presentation/controllers/chat';
import { Controller } from 'src/presentation/protocols';
import { GET_CHAT_BY_ID_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';

export class BuildGetChatByIdControllerFactory {
  constructor(
    @Inject(GET_CHAT_BY_ID_FACTORY) private readonly getChatByIdUseCase: GetChatByIdUseCase,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new GetChatByIdController(this.getChatByIdUseCase);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, this.loadUserByEmail, jwtAdapter);

    return authenticationProxy;
  }
}
