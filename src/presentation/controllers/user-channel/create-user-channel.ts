import { UserChannelModel } from 'src/domain/models';
import { CreateUserChannelUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, noContent, serverError } from 'src/presentation/helpers';
import { Controller, HttpResponse } from 'src/presentation/protocols';

export class CreateUserChannelController implements Controller {
  constructor(private readonly createUserChannel: CreateUserChannelUseCase) {}

  async handle(parameters: CreateUserChannelController.Parameters): Promise<HttpResponse> {
    try {
      const mandatoryFields: CreateUserChannelController.MandatoryFields[] = ['channelId', 'userId'];

      for (const data of parameters.data) {
        for (const field of mandatoryFields) {
          if (data[field] === null || data[field] === undefined) {
            return badRequest(new MissingParamError(field));
          }
        }
      }

      await this.createUserChannel.create(parameters.data);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateUserChannelController {
  export type Parameters = {
    data: CreateUserChannelUseCase.Parameters;
    token: string;
  };
  export type MandatoryFields = keyof Omit<UserChannelModel, 'id' | 'status' | 'createdAt'>;
}
