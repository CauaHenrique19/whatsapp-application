import { EmitMessagesUseCase } from 'src/domain/usecases';
import { ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class EmitMessagesController implements Controller {
  constructor(private readonly emitMessages: EmitMessagesUseCase) {}

  async handle(parameters: ControllerData<EmitMessagesController.Parameters>): Promise<HttpResponse> {
    try {
      const { clientId } = parameters.data;
      const result = await this.emitMessages.emit({ clientId });
      return ok({ result });
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace EmitMessagesController {
  export type Parameters = {
    clientId: number;
  };
}
