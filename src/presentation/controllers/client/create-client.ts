import { ClientModel } from 'src/domain/models';
import { CreateClientUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { ControllerData, Controller, HttpResponse } from 'src/presentation/protocols';

export class CreateClientController implements Controller {
  constructor(private readonly createClientUseCase: CreateClientUseCase) {}

  async handle(parameters: ControllerData<CreateClientController.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields = ['name'];

      for (const field of mandatoryFields) {
        if (!parameters.data[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.createClientUseCase.create(parameters.data);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateClientController {
  export type Parameters = Omit<ClientModel, 'id'>;
}
