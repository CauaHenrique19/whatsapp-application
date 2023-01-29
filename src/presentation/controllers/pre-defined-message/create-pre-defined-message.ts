import { CreatePreDefinedMessage } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class CreatePreDefinedMessageControler implements Controller {
  constructor(private readonly createPreDefinedMessage: CreatePreDefinedMessage) {}

  async handle(parameters: ControllerData<CreatePreDefinedMessageControler.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields: CreatePreDefinedMessageControler.MandatoryFields[] = ['userId', 'content'];

      for (const field of mandatoryFields) {
        if (parameters.data[field] === null || parameters.data[field] === undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.createPreDefinedMessage.create(parameters.data);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreatePreDefinedMessageControler {
  export type Parameters = CreatePreDefinedMessage.Parameters;
  export type MandatoryFields = keyof Parameters;
}
