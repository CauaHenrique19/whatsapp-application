import { ControllerData } from './controller-data';
import { HttpResponse } from './http';

export interface Gateway {
  handle(data: ControllerData): Promise<HttpResponse>;
}
