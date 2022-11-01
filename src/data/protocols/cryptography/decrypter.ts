import { InfoToken } from './info-token';

export interface Decrypter {
  decrypt(token: string): Promise<InfoToken>;
}
