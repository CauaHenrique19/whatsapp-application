import { Body, Controller, Post, Response, Headers } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildEmitMessageControllerFactory } from 'src/main/factories/controllers/message';

@Controller('messages')
export class MessageController {
  constructor(private readonly buildEmitMessageControllerFactory: BuildEmitMessageControllerFactory) {}

  @Post('allow-receive')
  async allowReceiveMessages(@Body() data, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildEmitMessageControllerFactory.build(), { data, token });
    return response.status(result.statusCode).json(result);
  }
}
