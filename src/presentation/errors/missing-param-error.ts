export class MissingParamError extends Error {
  constructor(fieldName: string) {
    super(`Missing param error: ${fieldName}`);
    this.name = `Missing param error: ${fieldName}`;
  }
}
