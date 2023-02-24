import { Provider } from '@nestjs/common';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { AUTHENTICATION_PROXY_FACTORY } from '../providers';
import { LoadUserByEmailUseCase } from 'src/domain/usecases';
import { Controller } from 'src/presentation/protocols';

export type AuthenticationProxyFactory = (controller: Controller) => AuthenticationProxy;

export const authenticationProxyFactory: Provider = {
  provide: AUTHENTICATION_PROXY_FACTORY,
  useFactory: (loadUserByEmail: LoadUserByEmailUseCase): AuthenticationProxyFactory => {
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const factory: AuthenticationProxyFactory = (controller: Controller) =>
      new AuthenticationProxy(controller, loadUserByEmail, jwtAdapter);
    return factory;
  },
  inject: [{ token: 'LOAD_USER_BY_EMAIL_FACTORY', optional: false }],
};
