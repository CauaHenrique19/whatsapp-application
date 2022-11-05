import { ObserverInterface } from 'src/data/protocols/observer';

export interface ConnectToWhatsapp {
  connect: (parameters: ConnectToWhatsapp.Parameters) => Promise<ConnectToWhatsapp.Result>;
}

export namespace ConnectToWhatsapp {
  export type Parameters = {
    clientId: string;
    observer: ObserverInterface<{ qrCode: string }>;
  };
  export type Result = {
    connected: boolean;
  };
}
