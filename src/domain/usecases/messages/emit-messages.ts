import { ObserverInterface } from 'src/data/protocols/observer';
import { MessageModel } from 'src/domain/models';

export interface EmitMessagesUseCase {
  emit(parameters: EmitMessagesUseCase.Parameters): Promise<EmitMessagesUseCase.Result>;
}

export namespace EmitMessagesUseCase {
  export type Parameters = {
    clientId: number;
    observer: ObserverInterface<MessageModel>;
  };
  export type Result = boolean;
}
