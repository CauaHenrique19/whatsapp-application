import { EmitMessagesUseCase } from 'src/domain/usecases';
import { ok, serverError } from 'src/presentation/helpers';
import { ControllerData, Gateway, HttpResponse } from 'src/presentation/protocols';

export class EmitMessagesGateway implements Gateway {
  constructor(private readonly emitMessages: EmitMessagesUseCase) {}

  async handle(parameters: ControllerData<EmitMessagesGateway.Parameters>): Promise<HttpResponse> {
    try {
      const { clientId } = parameters.data;
      const result = await this.emitMessages.emit({ clientId, observer: parameters.observer });
      return ok({ result });
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace EmitMessagesGateway {
  export type Parameters = {
    clientId: number;
  };
}
