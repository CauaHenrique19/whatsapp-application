import { Controller, HttpResponse } from 'src/presentation/protocols';

export const controllerAdapter = async (controller: Controller, data?: { data: any; token?: string }): Promise<HttpResponse> => {
  return controller.handle({ data: data.data, token: data.token });
};
