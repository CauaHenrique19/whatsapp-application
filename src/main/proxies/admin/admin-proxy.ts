import { Decrypter } from 'src/data/protocols/cryptography';
import { LoadUserByEmailUseCase } from 'src/domain/usecases';
import { serverError, unauthorized } from 'src/presentation/helpers';
import { Controller, HttpResponse } from 'src/presentation/protocols';

export class AdminProxy implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly loadUserByEmail: LoadUserByEmailUseCase,
    private readonly decrypter: Decrypter,
  ) {}

  async handle(data: any): Promise<HttpResponse> {
    try {
      if (!data.token) {
        return unauthorized();
      }

      const value = await this.decrypter.decrypt(data.token);

      const user = await this.loadUserByEmail.loadByEmail(value.email);
      if (!user.admin) {
        return unauthorized();
      }

      return await this.controller.handle(data);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
