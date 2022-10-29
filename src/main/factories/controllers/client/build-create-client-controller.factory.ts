import { Inject, Injectable } from '@nestjs/common';
import { CreateClientUseCase } from 'src/domain/usecases';
import { CreateClientController } from 'src/presentation/controllers/client';
import { Controller } from 'src/presentation/protocols';
import { CREATE_CLIENT_FACTORY } from '../../providers';

@Injectable()
export class BuildCreateClientControllerFactory {
  constructor(@Inject(CREATE_CLIENT_FACTORY) private readonly createClient: CreateClientUseCase) {}

  public build(): Controller {
    return new CreateClientController(this.createClient);
  }
}
