import { Inject, Injectable } from '@nestjs/common';
import { CreateClientUseCase } from 'src/domain/usecases';
import { CreateClientController } from 'src/presentation/controllers/client';
import { Controller } from 'src/presentation/protocols';
import { ADMIN_PROXY_FACTORY, AUTHENTICATION_PROXY_FACTORY, CREATE_CLIENT_FACTORY } from 'src/main/factories/providers';
import { AuthenticationProxyFactory, AdminProxyFactory } from 'src/main/factories/proxies';

@Injectable()
export class BuildCreateClientControllerFactory {
  constructor(
    @Inject(CREATE_CLIENT_FACTORY) private readonly createClient: CreateClientUseCase,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
    @Inject(ADMIN_PROXY_FACTORY) private readonly adminProxyFactory: AdminProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new CreateClientController(this.createClient);

    const authenticationProxy = this.authenticationProxyFactory(controller);
    const adminProxy = this.adminProxyFactory(authenticationProxy);

    return adminProxy;
  }
}
