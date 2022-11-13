import { Controller } from './../../../../presentation/protocols/controller';
import { Inject } from '@nestjs/common';
import { CreateChannelUseCase, LoadUserByEmailUseCase } from 'src/domain/usecases';
import { CREATE_CHANNEL_FACTORY, LOAD_USER_BY_EMAIL_FACTORY } from '../../providers';
import { AdminProxy, AuthenticationProxy } from 'src/main/proxies';
import { CreateChannelController } from 'src/presentation/controllers/channel';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';

export class BuildCreateChannelControllerFactory {
  constructor(
    @Inject(CREATE_CHANNEL_FACTORY) private readonly createChannelUseCase: CreateChannelUseCase,
    @Inject(LOAD_USER_BY_EMAIL_FACTORY) private readonly loadUserByEmail: LoadUserByEmailUseCase,
  ) {}

  public build(): Controller {
    const controller = new CreateChannelController(this.createChannelUseCase);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(controller, this.loadUserByEmail, jwtAdapter);
    const adminProxy = new AdminProxy(authenticationProxy, this.loadUserByEmail, jwtAdapter);

    return adminProxy;
  }
}
