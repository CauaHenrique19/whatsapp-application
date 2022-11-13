import { Inject } from '@nestjs/common';
import { EmitMessagesUseCase, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { EmitMessagesController } from 'src/presentation/controllers/message';
import { Controller } from 'src/presentation/protocols';
import { EMIT_MESSAGES_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';

export class BuildEmitMessageControllerFactory {
  constructor(
    @Inject(EMIT_MESSAGES_FACTORY) private readonly emitMessages: EmitMessagesUseCase,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new EmitMessagesController(this.emitMessages);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, this.loadUserByEmail, jwtAdapter);

    return authenticationProxy;
  }
}
