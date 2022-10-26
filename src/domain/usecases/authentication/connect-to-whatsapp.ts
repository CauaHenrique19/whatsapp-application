export interface ConnectToWhatsapp {
  connect: (
    parameters: ConnectToWhatsapp.Parameters,
  ) => Promise<ConnectToWhatsapp.Result>;
}

export namespace ConnectToWhatsapp {
  export type Parameters = {
    id: string;
  };
  export type Result = string;
}
