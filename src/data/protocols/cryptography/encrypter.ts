import { InfoToken } from './info-token';

export interface Encrypter {
  encrypt(value: InfoToken): Promise<string>;
}
