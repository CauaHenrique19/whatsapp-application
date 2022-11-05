import { Decrypter } from 'src/data/protocols/cryptography';
import { serverError, unauthorized } from 'src/presentation/helpers';
import { Controller, Gateway, HttpResponse } from 'src/presentation/protocols';

export class AuthenticationProxy implements Controller, Gateway {
  constructor(private readonly controller: Controller | Gateway, private readonly decrypter: Decrypter) {}

  async handle(data: any): Promise<HttpResponse> {
    try {
      if (!data.token) {
        return unauthorized();
      }

      const value = await this.decrypter.decrypt(data.token);

      if (!value) {
        return unauthorized();
      }

      return await this.controller.handle(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
