import { Inject } from '@nestjs/common';
import { GetPreDefinedMessageByUserId } from 'src/domain/usecases';
import { GetPreDefinedMessageByUserIdController } from 'src/presentation/controllers/pre-defined-message';
import { Controller } from 'src/presentation/protocols';
import { AUTHENTICATION_PROXY_FACTORY, GET_PRE_DEFINED_MESSAGE_BY_USER_ID_FACTORY } from 'src/main/factories/providers';
import { AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildGetPreDefinedMessageByUserIdFactory {
  constructor(
    @Inject(GET_PRE_DEFINED_MESSAGE_BY_USER_ID_FACTORY) private readonly getPreDefinedMessageByUserId: GetPreDefinedMessageByUserId,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new GetPreDefinedMessageByUserIdController(this.getPreDefinedMessageByUserId);
    const authenticationProxy = this.authenticationProxyFactory(controller);

    return authenticationProxy;
  }
}
