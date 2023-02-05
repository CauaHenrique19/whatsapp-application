import { Inject } from '@nestjs/common';
import { GetPreDefinedMessageByUserId, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { GetPreDefinedMessageByUserIdController } from 'src/presentation/controllers/pre-defined-message';
import { Controller } from 'src/presentation/protocols';
import { GET_PRE_DEFINED_MESSAGE_BY_USER_ID_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';

export class BuildGetPreDefinedMessageByUserIdFactory {
  constructor(
    @Inject(GET_PRE_DEFINED_MESSAGE_BY_USER_ID_FACTORY) private readonly getPreDefinedMessageByUserId: GetPreDefinedMessageByUserId,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new GetPreDefinedMessageByUserIdController(this.getPreDefinedMessageByUserId);

    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, this.loadUserByEmail, jwtAdapter);

    return authenticationProxy;
  }
}
