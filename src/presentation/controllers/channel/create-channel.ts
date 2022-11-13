import { CreateChannelUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class CreateChannelController implements Controller {
  constructor(private readonly createChannelUseCase: CreateChannelUseCase) {}

  async handle(parameters: ControllerData<CreateChannelUseCase.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields: CreateChannelController.MandatoryFields[] = ['clientId', 'name', 'users', 'description'];

      for (const field of mandatoryFields) {
        if (parameters.data[field] === null || parameters.data[field] === undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      const channel = await this.createChannelUseCase.create({
        clientId: parameters.data.clientId,
        name: parameters.data.name,
        users: parameters.data.users,
        description: parameters.data.description,
      });

      return ok(channel);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateChannelController {
  export type Parameters = CreateChannelUseCase.Parameters;
  export type MandatoryFields = keyof Parameters;
}
