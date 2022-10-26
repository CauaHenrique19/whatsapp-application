export interface Gateway {
  handle(data: any): Promise<any>;
}
