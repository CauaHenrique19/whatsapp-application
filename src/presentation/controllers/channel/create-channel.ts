import { CreateChannelUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, HttpResponse } from 'src/presentation/protocols';

export class CreateChannelController implements Controller {
  constructor(private readonly createChannelUseCase: CreateChannelUseCase) {}

  async handle(data: CreateChannelController.Parameters): Promise<HttpResponse> {
    try {
      const mandatoryFields: CreateChannelController.MandatoryFields[] = ['clientId', 'name', 'users'];

      for (const field of mandatoryFields) {
        if (!data[field] === null) {
          return badRequest(new MissingParamError(field));
        }
      }

      const channel = await this.createChannelUseCase.create({ clientId: data.clientId, name: data.name, users: data.users });

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
