import { Inject } from '@nestjs/common';
import { ConnectToWhatsapp } from 'src/domain/usecases';
import { ConnectToWhatsappGateway } from 'src/presentation/controllers/authentication';
import { Gateway } from 'src/presentation/protocols';
import { CONNECT_TO_WHATSAPP_FACTORY } from '../../providers';

export class BuildConnectToWhatsappGatewayFactory {
  constructor(
    @Inject(CONNECT_TO_WHATSAPP_FACTORY)
    private readonly connectToWhatsappUseCase: ConnectToWhatsapp,
  ) {}

  public build(): Gateway {
    return new ConnectToWhatsappGateway(this.connectToWhatsappUseCase);
  }
}
