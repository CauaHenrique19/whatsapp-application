import { Controller } from '../../../../presentation/protocols/controller';
import { Inject } from '@nestjs/common';
import { CreateUserChannelUseCase, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { CREATE_USER_CHANNEL_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from 'src/main/factories/providers';
import { CreateUserChannelController } from 'src/presentation/controllers/user-channel';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AdminProxy, AuthenticationProxy } from 'src/main/proxies';

export class BuildCreateUserChannelControllerFactory {
  constructor(
    @Inject(CREATE_USER_CHANNEL_FACTORY) private readonly createUserChannelUseCDase: CreateUserChannelUseCase,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new CreateUserChannelController(this.createUserChannelUseCDase);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, jwtAdapter);
    const adminProxy = new AdminProxy(authenticationProxy, this.loadUserByEmail, jwtAdapter);

    return adminProxy;
  }
}
