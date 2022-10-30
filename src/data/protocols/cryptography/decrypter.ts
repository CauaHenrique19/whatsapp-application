export interface Decrypter {
  decrypt(token: string): Promise<DecrypterResult>;
}

export interface DecrypterResult {
  id: string;
}
