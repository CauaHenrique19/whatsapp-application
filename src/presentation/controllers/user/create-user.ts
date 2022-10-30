import { UserModel } from 'src/domain/models/user';
import { CreateUserUseCase } from 'src/domain/usecases';
import { InvalidParamError, MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, HttpResponse } from 'src/presentation/protocols';

export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(data: CreateUserController.Parameters): Promise<HttpResponse> {
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
        if (!data[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (data.password !== data.confirmationPassword) {
        return badRequest(new InvalidParamError('confirmationPassword'));
      }

      const result = await this.createUserUseCase.create(data);
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
