import { Decrypter, Encrypter, InfoToken } from 'src/data/protocols/cryptography';
import { sign, verify } from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: InfoToken): Promise<string> {
    const accessToken = await sign({ id: value }, this.secret);
    return accessToken;
  }

  async decrypt(token: string): Promise<InfoToken> {
    const decoded = new Promise<InfoToken>(async (resolve) => {
      await verify(token, this.secret, async (error, encoded: { id: InfoToken }) => {
        if (error) {
          resolve(null);
        }

        resolve(encoded.id);
      });
    });

    return decoded;
  }
}
