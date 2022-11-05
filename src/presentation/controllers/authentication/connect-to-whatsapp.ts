import { ObserverInterface } from 'src/data/protocols/observer';
import { ConnectToWhatsapp } from 'src/domain/usecases';
import { Gateway } from 'src/presentation/protocols';

export class ConnectToWhatsappGateway implements Gateway {
  constructor(private readonly connectToWhatsapp: ConnectToWhatsapp) {}

  async handle(data: ConnectToWhatsappGateway.Parameters): Promise<ConnectToWhatsappGateway.Result> {
    try {
      const { clientId, observer } = data;
      await this.connectToWhatsapp.connect({ clientId, observer });
    } catch (error) {
      return {
        error: 'Internal Server Error',
        statusCode: 500,
      };
    }
  }
}

export namespace ConnectToWhatsappGateway {
  export type Parameters = {
    clientId: string;
    observer: ObserverInterface<{ qrCode: string }>;
  };

  export type Result = SucessResult | ErrorResult;

  type SucessResult = void;

  type ErrorResult = {
    error: string;
    statusCode: number;
  };
}
