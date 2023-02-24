import { Provider } from '@nestjs/common';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AdminProxy } from 'src/main/proxies';
import { ADMIN_PROXY_FACTORY } from '../providers';
import { LoadUserByEmailUseCase } from 'src/domain/usecases';
import { Controller } from 'src/presentation/protocols';

export type AdminProxyFactory = (controller: Controller) => AdminProxy;

export const adminProxyFactory: Provider = {
  provide: ADMIN_PROXY_FACTORY,
  useFactory: (loadUserByEmail: LoadUserByEmailUseCase): AdminProxyFactory => {
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const factory: AdminProxyFactory = (controller: Controller) => new AdminProxy(controller, loadUserByEmail, jwtAdapter);
    return factory;
  },
  inject: [{ token: 'LOAD_USER_BY_EMAIL_FACTORY', optional: false }],
};
