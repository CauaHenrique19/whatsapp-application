import { AuthenticationUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { Controller, HttpResponse } from 'src/presentation/protocols';

export class LoginController implements Controller {
  constructor(private readonly authenticationUseCase: AuthenticationUseCase) {}

  async handle(data: LoginController.Parameters): Promise<HttpResponse> {
    try {
      const mandatoryFields: LoginController.MandatoryFields[] = ['email', 'password'];

      for (const field of mandatoryFields) {
        if (!data[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.authenticationUseCase.authentication(data);
      const httpResponse = result.valid ? ok(result.result) : badRequest(new Error(result.result as string));

      return httpResponse;
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoginController {
  export type Parameters = {
    email: string;
    password: string;
  };

  export type MandatoryFields = keyof Parameters;
}
