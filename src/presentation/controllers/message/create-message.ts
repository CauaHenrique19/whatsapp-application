import { MessageModel } from 'src/domain/models';
import { CreateMessageUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class CreateMessageController implements Controller {
  constructor(private readonly createMessageUseCase: CreateMessageUseCase) {}

  async handle(parameters: ControllerData<CreateMessageController.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields: CreateMessageController.MandatoryFields[] = ['chatId', 'content'];

      for (const field of mandatoryFields) {
        if (parameters.data[field] === null || parameters.data[field] === undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.createMessageUseCase.create({ ...parameters.data, user: parameters.user });
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateMessageController {
  export type Parameters = Pick<MessageModel, 'chatId' | 'content'>;
  export type MandatoryFields = keyof Parameters;
}
