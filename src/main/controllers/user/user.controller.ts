import { Body, Controller, Post, Response } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildCreateUserControllerFactory } from 'src/main/factories/controllers';

@Controller('users')
export class UserController {
  constructor(private readonly buildCreateUserControllerFactory: BuildCreateUserControllerFactory) {}

  @Post()
  async createUser(@Body() body, @Response() response) {
    const result = await controllerAdapter(this.buildCreateUserControllerFactory.build(), body);
    return response.status(result.statusCode).json(result);
  }
}
