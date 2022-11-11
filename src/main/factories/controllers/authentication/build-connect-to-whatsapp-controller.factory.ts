import { Inject } from '@nestjs/common';
import { ConnectToWhatsapp } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { ConnectToWhatsappController } from 'src/presentation/controllers/authentication';
import { Controller } from 'src/presentation/protocols';
import { CONNECT_TO_WHATSAPP_FACTORY } from '../../providers';

export class BuildConnectToWhatsappControllerFactory {
  constructor(
    @Inject(CONNECT_TO_WHATSAPP_FACTORY)
    private readonly connectToWhatsappUseCase: ConnectToWhatsapp,
  ) {}

  public build(): Controller {
    const controller = new ConnectToWhatsappController(this.connectToWhatsappUseCase);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);

    const authenticationProxy = new AuthenticationProxy(controller, jwtAdapter);
    return authenticationProxy;
  }
}
