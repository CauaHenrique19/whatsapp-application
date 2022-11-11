import { Body, Controller, Post, Response, Headers } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildLoginControllerFactory, BuildConnectToWhatsappControllerFactory } from 'src/main/factories/controllers';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly buildLoginControllerFactory: BuildLoginControllerFactory,
    private readonly buildConnectToWhatsappControllerFactory: BuildConnectToWhatsappControllerFactory,
  ) {}

  @Post('/login')
  async createClient(@Body() body, @Response() response) {
    const result = await controllerAdapter(this.buildLoginControllerFactory.build(), { data: body });
    return response.status(result.statusCode).json(result);
  }

  @Post('/connect-to-whatsapp')
  async connectToWhatsapp(@Body() data, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildConnectToWhatsappControllerFactory.build(), { data, token });
    return response.status(result.statusCode).json(result);
  }
}
