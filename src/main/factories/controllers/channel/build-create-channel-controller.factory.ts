import { Controller } from 'src/presentation/protocols';
import { Inject } from '@nestjs/common';
import { CreateChannelUseCase } from 'src/domain/usecases';
import { ADMIN_PROXY_FACTORY, AUTHENTICATION_PROXY_FACTORY, CREATE_CHANNEL_FACTORY } from 'src/main/factories/providers';
import { CreateChannelController } from 'src/presentation/controllers/channel';
import { AdminProxyFactory, AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildCreateChannelControllerFactory {
  constructor(
    @Inject(CREATE_CHANNEL_FACTORY) private readonly createChannelUseCase: CreateChannelUseCase,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
    @Inject(ADMIN_PROXY_FACTORY) private readonly adminProxyFactory: AdminProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new CreateChannelController(this.createChannelUseCase);
    const authenticationProxy = this.authenticationProxyFactory(controller);
    const adminProxy = this.adminProxyFactory(authenticationProxy);

    return adminProxy;
  }
}
