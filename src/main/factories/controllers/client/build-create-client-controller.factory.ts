import { Inject, Injectable } from '@nestjs/common';
import { CreateClientUseCase, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AdminProxy, AuthenticationProxy } from 'src/main/proxies';
import { CreateClientController } from 'src/presentation/controllers/client';
import { Controller } from 'src/presentation/protocols';
import { CREATE_CLIENT_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';

@Injectable()
export class BuildCreateClientControllerFactory {
  constructor(
    @Inject(CREATE_CLIENT_FACTORY) private readonly createClient: CreateClientUseCase,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new CreateClientController(this.createClient);

    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, jwtAdapter);
    const adminProxy = new AdminProxy(authenticationProxy, this.loadUserByEmail, jwtAdapter);

    return adminProxy;
  }
}
