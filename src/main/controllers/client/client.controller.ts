import { Body, Controller, Post, Response, Headers } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildCreateClientControllerFactory } from '../../factories/controllers/client';

@Controller('clients')
export class ClientController {
  constructor(private readonly buildCreateClientControllerFactory: BuildCreateClientControllerFactory) {}

  @Post()
  async createClient(@Body() body, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildCreateClientControllerFactory.build(), { ...body, token });
    return response.status(result.statusCode).json(result);
  }
}
