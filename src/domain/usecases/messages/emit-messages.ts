export interface EmitMessagesUseCase {
  emit(parameters: EmitMessagesUseCase.Parameters): Promise<EmitMessagesUseCase.Result>;
}

export namespace EmitMessagesUseCase {
  export type Parameters = {
    clientId: number;
  };
  export type Result = boolean;
}
