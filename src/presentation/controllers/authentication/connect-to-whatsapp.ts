import { ConnectToWhatsapp } from 'src/domain/usecases';
import { ok, serverError } from 'src/presentation/helpers';
import { ControllerData, Gateway, HttpResponse } from 'src/presentation/protocols';

export class ConnectToWhatsappGateway implements Gateway {
  constructor(private readonly connectToWhatsapp: ConnectToWhatsapp) {}

  async handle(data: ControllerData<ConnectToWhatsappGateway.Parameters>): Promise<HttpResponse> {
    try {
      const { clientId } = data.data;

      const result = await this.connectToWhatsapp.connect({ clientId });
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace ConnectToWhatsappGateway {
  export type Parameters = {
    clientId: number;
  };
}
