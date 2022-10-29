import { Body, Controller, Post, Response } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildCreateClientControllerFactory } from '../../factories/controllers/client';

@Controller('clients')
export class ClientController {
  constructor(private readonly buildCreateClientControllerFactory: BuildCreateClientControllerFactory) {}

  @Post()
  async createClient(@Body() body, @Response() response) {
    const result = await controllerAdapter(this.buildCreateClientControllerFactory.build(), body);
    return response.status(result.statusCode).json(result);
  }
}
