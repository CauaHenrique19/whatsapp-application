import { Inject } from '@nestjs/common';
import { CreateUserChannelUseCase } from 'src/domain/usecases';
import { ADMIN_PROXY_FACTORY, AUTHENTICATION_PROXY_FACTORY, CREATE_USER_CHANNEL_FACTORY } from 'src/main/factories/providers';
import { CreateUserChannelController } from 'src/presentation/controllers/user-channel';
import { Controller } from 'src/presentation/protocols';
import { AdminProxyFactory, AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildCreateUserChannelControllerFactory {
  constructor(
    @Inject(CREATE_USER_CHANNEL_FACTORY) private readonly createUserChannelUseCase: CreateUserChannelUseCase,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
    @Inject(ADMIN_PROXY_FACTORY) private readonly adminProxyFactory: AdminProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new CreateUserChannelController(this.createUserChannelUseCase);
    const authenticationProxy = this.authenticationProxyFactory(controller);
    const adminProxy = this.adminProxyFactory(authenticationProxy);

    return adminProxy;
  }
}
