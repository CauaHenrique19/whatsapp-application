import { Body, Controller, Post, Response, Headers, UsePipes, ValidationPipe } from '@nestjs/common';
import { controllerAdapter } from 'src/main/adapters';
import { BuildAttachChatToUserControllerFactory, BuildFinishChatControllerFactory } from 'src/main/factories/controllers';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly buildAttachChatToUserControllerFactory: BuildAttachChatToUserControllerFactory,
    private readonly buildFinishChatControllerFactory: BuildFinishChatControllerFactory,
  ) {}

  @Post('attach-to-user')
  async attachChatToUser(@Body() body, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildAttachChatToUserControllerFactory.build(), { data: body, token });
    return response.status(result.statusCode).json(result);
  }

  @Post('finish')
  async finishChat(@Body() body, @Headers('authorization') token, @Response() response) {
    const result = await controllerAdapter(this.buildFinishChatControllerFactory.build(), { data: body, token });
    return response.status(result.statusCode).json(result);
  }
}
