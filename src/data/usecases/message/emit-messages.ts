import { WebsocketEventsEnum } from 'src/data/enums';
import { MultitonInterface } from 'src/data/protocols/multiton';
import { WebsocketInterface } from 'src/data/protocols/websocket';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { WhatsappMessageModel } from 'src/domain/models';
import { EmitMessagesUseCase } from 'src/domain/usecases';

export class EmitMessages implements EmitMessagesUseCase {
  constructor(private readonly multiton: MultitonInterface<WhatsappClientInterface>, private readonly websocketAdapter: WebsocketInterface) {}

  async emit(parameters: EmitMessagesUseCase.Parameters): Promise<EmitMessagesUseCase.Result> {
    const { clientId } = parameters;

    const client = await this.multiton.getInstance(clientId);
    client.instance.onMessage((message) => {
      this.websocketAdapter.emitEvent<WhatsappMessageModel>(WebsocketEventsEnum.NEW_MESSAGE, message);
    });

    let result = true;

    if (!client) {
      result = false;
    }

    return result;
  }
}
