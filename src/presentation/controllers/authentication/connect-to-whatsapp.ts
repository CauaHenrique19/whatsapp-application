import { ObserverInterface } from 'src/data/protocols/observer';
import { ConnectToWhatsapp } from 'src/domain/usecases';
import { badRequest, ok } from 'src/presentation/helpers';
import { Gateway, HttpResponse } from 'src/presentation/protocols';

export class ConnectToWhatsappGateway implements Gateway {
  constructor(private readonly connectToWhatsapp: ConnectToWhatsapp) {}

  async handle(data: ConnectToWhatsappGateway.Parameters): Promise<HttpResponse> {
    try {
      const { clientId, observer } = data;
      const result = await this.connectToWhatsapp.connect({ clientId, observer });
      return ok(result);
    } catch (error) {
      return badRequest(error);
    }
  }
}

export namespace ConnectToWhatsappGateway {
  export type Parameters = {
    clientId: string;
    observer: ObserverInterface<{ qrCode: string }>;
  };
}
