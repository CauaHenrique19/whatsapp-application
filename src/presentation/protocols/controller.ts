import { ControllerData } from './controller-data';
import { HttpResponse } from './http';

export interface Controller {
  handle(parameters: ControllerData): Promise<HttpResponse>;
}
