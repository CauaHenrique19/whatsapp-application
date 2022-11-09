import { ObserverInterface } from 'src/data/protocols/observer';
import { Controller, HttpResponse } from 'src/presentation/protocols';

export const controllerAdapter = async (
  controller: Controller,
  data?: { data: any; token?: string; observer?: ObserverInterface<any> },
): Promise<HttpResponse> => {
  return controller.handle({ data: data.data, token: data.token, observer: data.observer });
};
