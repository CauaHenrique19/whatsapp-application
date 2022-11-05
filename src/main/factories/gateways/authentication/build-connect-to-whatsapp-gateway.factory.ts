import { Inject } from '@nestjs/common';
import { ConnectToWhatsapp } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { ConnectToWhatsappGateway } from 'src/presentation/controllers/authentication';
import { Gateway } from 'src/presentation/protocols';
import { CONNECT_TO_WHATSAPP_FACTORY } from '../../providers';

export class BuildConnectToWhatsappGatewayFactory {
  constructor(
    @Inject(CONNECT_TO_WHATSAPP_FACTORY)
    private readonly connectToWhatsappUseCase: ConnectToWhatsapp,
  ) {}

  public build(): Gateway {
    const gateway = new ConnectToWhatsappGateway(this.connectToWhatsappUseCase);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);

    const authenticationProxy = new AuthenticationProxy(gateway, jwtAdapter);
    return authenticationProxy;
  }
}
