import { Inject } from '@nestjs/common';
import { ConnectToWhatsapp } from 'src/domain/usecases';
import { ConnectToWhatsappController } from 'src/presentation/controllers/authentication';
import { Controller } from 'src/presentation/protocols';
import { AUTHENTICATION_PROXY_FACTORY, CONNECT_TO_WHATSAPP_FACTORY } from 'src/main/factories/providers';
import { AuthenticationProxyFactory } from 'src/main/factories/proxies';

export class BuildConnectToWhatsappControllerFactory {
  constructor(
    @Inject(CONNECT_TO_WHATSAPP_FACTORY) private readonly connectToWhatsappUseCase: ConnectToWhatsapp,
    @Inject(AUTHENTICATION_PROXY_FACTORY) private readonly authenticationProxyFactory: AuthenticationProxyFactory,
  ) {}

  public build(): Controller {
    const controller = new ConnectToWhatsappController(this.connectToWhatsappUseCase);
    const authenticationProxy = this.authenticationProxyFactory(controller);
    return authenticationProxy;
  }
}
