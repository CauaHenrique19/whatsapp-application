import { Body, Controller, Headers, Post, Response, UsePipes, ValidationPipe } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildCreateUserChannelControllerFactory } from 'src/main/factories/controllers';

@Controller('user-channel')
export class UserChannelController {
  constructor(private readonly buildCreateUserChannelController: BuildCreateUserChannelControllerFactory) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUserChannel(@Body() data, @Response() response, @Headers('authorization') token) {
    const result = await controllerAdapter(this.buildCreateUserChannelController.build(), { data, token });
    response.status(result.statusCode).json(result);
  }
}
