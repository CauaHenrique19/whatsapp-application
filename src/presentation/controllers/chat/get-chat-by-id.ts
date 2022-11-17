import { GetChatByIdUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class GetChatByIdController implements Controller {
  constructor(private readonly getChatByIdUseCase: GetChatByIdUseCase) {}

  async handle(parameters: ControllerData<GetChatByIdController.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields: GetChatByIdController.MandatoryFields[] = ['id'];

      for (const field of mandatoryFields) {
        if (parameters.data[field] === null || parameters.data[field] === undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.getChatByIdUseCase.getById(parameters.data);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace GetChatByIdController {
  export type Parameters = {
    id: number;
  };
  export type MandatoryFields = keyof Parameters;
}
