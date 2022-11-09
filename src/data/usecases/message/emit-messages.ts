import { MultitonInterface } from 'src/data/protocols/multiton';
import { WhatsappClientInterface } from 'src/data/protocols/whatsapp';
import { EmitMessagesUseCase } from 'src/domain/usecases';

export class EmitMessages implements EmitMessagesUseCase {
  constructor(private readonly multiton: MultitonInterface<WhatsappClientInterface>) {}

  async emit(parameters: EmitMessagesUseCase.Parameters): Promise<EmitMessagesUseCase.Result> {
    const { clientId, observer } = parameters;

    const client = await this.multiton.getInstance(clientId);
    client.instance.onMessage((message) => observer.notify(message));

    let result = true;

    if (!client) {
      result = false;
    }

    return result;
  }
}
