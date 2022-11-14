import { Inject } from '@nestjs/common';
import { CreateMessageUseCase, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { CreateMessageController } from 'src/presentation/controllers/message';
import { Controller } from 'src/presentation/protocols';
import { CREATE_MESSAGE_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';

export class BuildCreateMessageControllerFactory {
  constructor(
    @Inject(CREATE_MESSAGE_FACTORY) private readonly createMessageUseCase: CreateMessageUseCase,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new CreateMessageController(this.createMessageUseCase);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, this.loadUserByEmail, jwtAdapter);

    return authenticationProxy;
  }
}
