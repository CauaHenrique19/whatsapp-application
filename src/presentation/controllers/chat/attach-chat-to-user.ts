import { AttachChatToUserUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class AttachChatToUserController implements Controller {
  constructor(private readonly attachChatToUser: AttachChatToUserUseCase) {}

  async handle(parameters: ControllerData<AttachChatToUserController.Parameters>): Promise<HttpResponse> {
    try {
      const { data, user } = parameters;
      const mandatoryFields: AttachChatToUserController.MandatoryFields[] = ['chatId'];

      for (const field of mandatoryFields) {
        if (data[field] === null || data[field] === undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.attachChatToUser.attachToUser({
        ...data,
        user: { id: user.id, clientId: user.clientId, name: user.name, lastName: user.lastName },
      });
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace AttachChatToUserController {
  export type Parameters = {
    chatId: number;
  };

  export type MandatoryFields = keyof Parameters;
}
