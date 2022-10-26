import { ConnectToWhatsapp } from 'src/domain/usecases';
import { Gateway } from 'src/presentation/protocols';

export class ConnectToWhatsappGateway implements Gateway {
  constructor(private readonly connectToWhatsapp: ConnectToWhatsapp) {}

  async handle(
    data: ConnectToWhatsappGateway.Parameters,
  ): Promise<ConnectToWhatsappGateway.Result> {
    try {
      const { id } = data;
      const qrCode = await this.connectToWhatsapp.connect({ id });

      return {
        qrCode,
      };
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
    id: string;
  };

  export type Result = SucessResult | ErrorResult;

  type SucessResult = {
    qrCode: string;
  };

  type ErrorResult = {
    error: string;
    statusCode: number;
  };
}
