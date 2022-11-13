import { AttachChatToUserUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class AttachChatToUserController implements Controller {
  constructor(private readonly attachChatToUser: AttachChatToUserUseCase) {}

  async handle(parameters: ControllerData<AttachChatToUserController.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields: AttachChatToUserController.MandatoryFields[] = ['userId', 'id'];

      for (const field of mandatoryFields) {
        if (parameters.data[field] === null || parameters.data[field] === undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.attachChatToUser.attachToUser(parameters.data);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace AttachChatToUserController {
  export type Parameters = {
    id: number;
    userId: number;
  };

  export type MandatoryFields = keyof Parameters;
}
