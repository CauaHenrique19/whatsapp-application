import { Body, Controller, Response, Headers, Post, Get, Param } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import {
  BuildCreatePreDefinedMessageControllerFactory,
  BuildGetPreDefinedMessageByUserIdFactory,
} from 'src/main/factories/controllers/pre-defined-message';

@Controller('pre-defined-messages')
export class PreDefinedMessageController {
  constructor(
    private readonly buildCreatePreDefinedMessageControllerFactory: BuildCreatePreDefinedMessageControllerFactory,
    private readonly buildGetPreDefinedMessageByUserIdFactory: BuildGetPreDefinedMessageByUserIdFactory,
  ) {}

  @Post()
  async createPreDefinedMessage(@Body() data, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildCreatePreDefinedMessageControllerFactory.build(), { data, token });
    return response.status(result.statusCode).json(result);
  }

  @Get()
  async getPreDefinedMessageByUserId(@Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildGetPreDefinedMessageByUserIdFactory.build(), { data: null, token });
    return response.status(result.statusCode).json(result);
  }
}
