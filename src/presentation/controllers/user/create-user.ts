import { UserModel } from 'src/domain/models/user';
import { CreateUserUseCase } from 'src/domain/usecases';
import { InvalidParamError, MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { ControllerData, Controller, HttpResponse } from 'src/presentation/protocols';

export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(parameters: ControllerData<CreateUserController.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields: CreateUserController.MandatoryFields[] = [
        'email',
        'name',
        'lastName',
        'password',
        'admin',
        'clientId',
        'confirmationPassword',
      ];

      for (const field of mandatoryFields) {
        if (parameters.data[field] === null || undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (parameters.data.password !== parameters.data.confirmationPassword) {
        return badRequest(new InvalidParamError('confirmationPassword'));
      }

      const result = await this.createUserUseCase.create(parameters.data);
      const httpResponse = result.valid ? ok(result.result) : badRequest(new Error(result.result as string));

      return httpResponse;
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateUserController {
  export type Parameters = Omit<UserModel, 'createdAt' | 'client' | 'status' | 'id'> & { confirmationPassword: string };
  export type MandatoryFields = keyof Parameters;
}
