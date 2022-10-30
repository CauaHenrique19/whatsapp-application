import { LoadUserByEmailRepository } from 'src/data/protocols/db';
import { LoadUserByEmailUseCase } from 'src/domain/usecases';

export class DbLoadUserByEmail implements LoadUserByEmailUseCase {
  constructor(private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

  async loadByEmail(email: LoadUserByEmailUseCase.Parameters): Promise<LoadUserByEmailUseCase.Result> {
    return await this.loadUserByEmailRepository.loadByEmail(email);
  }
}
