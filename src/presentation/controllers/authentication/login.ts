import { AuthenticationUseCase } from 'src/domain/usecases';
import { MissingParamError } from 'src/presentation/errors';
import { badRequest, ok, serverError } from 'src/presentation/helpers';
import { ControllerData, Controller, HttpResponse } from 'src/presentation/protocols';

export class LoginController implements Controller {
  constructor(private readonly authenticationUseCase: AuthenticationUseCase) {}

  async handle(parameters: ControllerData<LoginController.Parameters>): Promise<HttpResponse> {
    try {
      const mandatoryFields: LoginController.MandatoryFields[] = ['email', 'password'];

      for (const field of mandatoryFields) {
        if (parameters.data[field] === null || parameters.data[field] === undefined) {
          return badRequest(new MissingParamError(field));
        }
      }

      const result = await this.authenticationUseCase.authentication(parameters.data);
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
