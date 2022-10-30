import { Body, Controller, Post, Response } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildLoginControllerFactory } from 'src/main/factories/controllers';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly buildLoginControllerFactory: BuildLoginControllerFactory) {}

  @Post('/login')
  async createClient(@Body() body, @Response() response) {
    const result = await controllerAdapter(this.buildLoginControllerFactory.build(), body);
    return response.status(result.statusCode).json(result);
  }
}
