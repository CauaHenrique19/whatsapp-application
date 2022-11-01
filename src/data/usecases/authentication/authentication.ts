import { Encrypter, HasherComparer } from 'src/data/protocols/cryptography';
import { LoadUserByEmailRepository } from 'src/data/protocols/db';
import { AuthenticationUseCase } from 'src/domain/usecases';

export class Authentication implements AuthenticationUseCase {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async authentication(parameters: AuthenticationUseCase.Parameters): Promise<AuthenticationUseCase.Result> {
    const user = await this.loadUserByEmailRepository.loadByEmail(parameters.email);

    if (!user) {
      return {
        valid: false,
        result: 'User not found',
      };
    }

    const passwordIsValid = await this.hasherComparer.compare(parameters.password, user.password);

    if (!passwordIsValid) {
      return {
        valid: false,
        result: 'Invalid password',
      };
    }

    delete user.password;
    const token = await this.encrypter.encrypt({ id: user.id.toString(), email: user.email });

    return {
      valid: true,
      result: {
        token,
        user,
      },
    };
  }
}
