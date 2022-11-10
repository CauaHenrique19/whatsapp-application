import { ObserverInterface } from 'src/data/protocols/observer';

export interface ConnectToWhatsapp {
  connect: (parameters: ConnectToWhatsapp.Parameters) => Promise<ConnectToWhatsapp.Result>;
}

export namespace ConnectToWhatsapp {
  export type Parameters = {
    clientId: number;
  };
  export type Result = {
    connected: boolean;
  };
}
