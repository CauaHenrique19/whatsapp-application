import { WebsocketEventsEnum } from 'src/data/enums';

export interface WebsocketInterface {
  emitEvent<T>(event: WebsocketEventsEnum, data: T): void;
  emitEventToRooms<T>(rooms: string[], event: WebsocketEventsEnum, data: T);
  listenEvent<T>(event: WebsocketEventsEnum, listener: (arg: T) => void): void;
}
