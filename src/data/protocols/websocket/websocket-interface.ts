import { WebsocketEventsEnum } from 'src/data/enums';

export interface WebsocketInterface {
  emitEvent<T>(event: WebsocketEventsEnum, data: T): void;
  listenEvent<T>(event: WebsocketEventsEnum, listener: (arg: T) => void): void;
}
