import { Body, Controller, Response, Headers, Post } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildCreatePreDefinedMessageControllerFactory } from 'src/main/factories/controllers/pre-defined-message';

@Controller('pre-defined-messages')
export class PreDefinedMessageController {
  constructor(private readonly buildCreatePreDefinedMessageControllerFactory: BuildCreatePreDefinedMessageControllerFactory) {}

  @Post()
  async createPreDefinedMessage(@Body() data, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildCreatePreDefinedMessageControllerFactory.build(), { data, token });
    return response.status(result.statusCode).json(result);
  }
}
