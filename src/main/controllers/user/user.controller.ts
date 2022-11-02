import { Body, Controller, Post, Response, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response as ResponseExpress } from 'express';
import { controllerAdapter } from 'src/main/adapters';
import { BuildCreateUserControllerFactory } from 'src/main/factories/controllers';
import { CreateUserDTO } from './dtos';

@Controller('users')
export class UserController {
  constructor(private readonly buildCreateUserControllerFactory: BuildCreateUserControllerFactory) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() body: CreateUserDTO, @Response() response: ResponseExpress): Promise<ResponseExpress> {
    const result = await controllerAdapter(this.buildCreateUserControllerFactory.build(), body);
    return response.status(result.statusCode).json(result);
  }
}
