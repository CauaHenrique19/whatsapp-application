import { Inject } from '@nestjs/common';
import { EmitMessagesUseCase } from 'src/domain/usecases';
import { JwtAdapter } from 'src/infra/cryptography/jwt-adapter';
import { AuthenticationProxy } from 'src/main/proxies';
import { EmitMessagesGateway } from 'src/presentation/controllers/message';
import { Gateway } from 'src/presentation/protocols';
import { EMIT_MESSAGES_FACTORY } from '../../providers';

export class BuildEmitMessageGatewayFactory {
  constructor(@Inject(EMIT_MESSAGES_FACTORY) private readonly emitMessages: EmitMessagesUseCase) {}

  public build(): Gateway {
    const gateway = new EmitMessagesGateway(this.emitMessages);
    const jwtAdapter = new JwtAdapter(process.env.SECRET);
    const authenticationProxy = new AuthenticationProxy(gateway, jwtAdapter);

    return authenticationProxy;
  }
}
