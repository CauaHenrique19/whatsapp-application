import { GetPreDefinedMessageByUserId } from 'src/domain/usecases';
import { ok, serverError } from 'src/presentation/helpers';
import { Controller, ControllerData, HttpResponse } from 'src/presentation/protocols';

export class GetPreDefinedMessageByUserIdController implements Controller {
  constructor(private readonly getPreDefinedMessageByUserId: GetPreDefinedMessageByUserId) {}

  async handle(parameters: ControllerData<null>): Promise<HttpResponse> {
    try {
      const result = await this.getPreDefinedMessageByUserId.getByUserId({ userId: parameters.user.id });
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
