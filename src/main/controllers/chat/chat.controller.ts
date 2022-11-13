import { Body, Controller, Post, Response, Headers, UsePipes, ValidationPipe } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildAttachChatToUserControllerFactory } from 'src/main/factories/controllers';

@Controller('chats')
export class ChatController {
  constructor(private readonly buildAttachChatToUserControllerFactory: BuildAttachChatToUserControllerFactory) {}

  @Post('attach-to-user')
  async attachChatToUser(@Body() body, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildAttachChatToUserControllerFactory.build(), { data: body, token });
    return response.status(result.statusCode).json(result);
  }
}
