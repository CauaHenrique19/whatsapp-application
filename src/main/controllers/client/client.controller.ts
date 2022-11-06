import { Body, Controller, Post, Response, Headers, UsePipes, ValidationPipe } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildCreateClientControllerFactory } from '../../factories/controllers/client';
import { CreateClientDTO } from './dtos';

@Controller('clients')
export class ClientController {
  constructor(private readonly buildCreateClientControllerFactory: BuildCreateClientControllerFactory) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createClient(@Body() body: CreateClientDTO, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildCreateClientControllerFactory.build(), { data: body, token });
    return response.status(result.statusCode).json(result);
  }
}
