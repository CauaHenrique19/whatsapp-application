import { Body, Controller, Headers, Post, Response } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildCreateChannelControllerFactory } from 'src/main/factories/controllers';

@Controller('channels')
export class ChannelController {
  constructor(private readonly buildCreateChannelControllerFactory: BuildCreateChannelControllerFactory) {}

  @Post()
  async create(@Body() data, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildCreateChannelControllerFactory.build(), { data, token });
    return response.status(result.statusCode).json(result);
  }
}
