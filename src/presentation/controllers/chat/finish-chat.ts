import { FinishChatUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class FinishChatController implements Controller {
  constructor(private readonly finishChat: FinishChatUseCase) {}

  async handle(parameters: ControllerData<FinishChatController.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields: FinishChatController.MandatoryFields[] = ['chatId'];

      for (const field of mandatoryFields) {
        if (parameters.data[field] === null || parameters.data[field] === undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.finishChat.finish({ ...parameters.data, userId: parameters.user.id, clientId: parameters.user.clientId });
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace FinishChatController {
  export type Parameters = {
    chatId: number;
  };

  export type MandatoryFields = keyof Parameters;
}
