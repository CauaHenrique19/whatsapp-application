import { ConnectToWhatsapp } from 'src/domain/usecases';
import { ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class ConnectToWhatsappController implements Controller {
  constructor(private readonly connectToWhatsapp: ConnectToWhatsapp) {}

  async handle(data: ControllerData<ConnectToWhatsappController.Parameters>): Promise<HttpResponse> {
    try {
      const { clientId } = data.data;

      const result = await this.connectToWhatsapp.connect({ clientId });
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace ConnectToWhatsappController {
  export type Parameters = {
    clientId: number;
  };
}
