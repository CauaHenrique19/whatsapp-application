import { Decrypter, Encrypter } from 'src/data/protocols/cryptography';
import { sign, verify } from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await sign({ id: value }, this.secret);
    return accessToken;
  }

  async decrypt(token: string): Promise<string> {
    const value = (await verify(token, this.secret)) as string;
    return value;
  }
}
