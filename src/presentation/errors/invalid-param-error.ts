export class InvalidParamError extends Error {
  constructor(fieldName: string) {
    super(`Invalid param error: ${fieldName}`);
    this.name = `Invalid param error: ${fieldName}`;
  }
}
