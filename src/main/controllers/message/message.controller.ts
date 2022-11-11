import { Body, Controller, Post, Response, Headers } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildEmitMessageGatewayFactory } from 'src/main/factories/gateways/message';

@Controller('messages')
export class MessageController {
  constructor(private readonly buildEmitMessageGatewayFactory: BuildEmitMessageGatewayFactory) {}

  @Post('allow-receive')
  async allowReceiveMessages(@Body() data, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildEmitMessageGatewayFactory.build(), { data, token });
    return response.status(result.statusCode).json(result);
  }
}
