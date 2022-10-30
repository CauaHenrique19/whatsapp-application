import { Decrypter, DecrypterResult, Encrypter } from 'src/data/protocols/cryptography';
import { sign, verify } from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await sign({ id: value }, this.secret);
    return accessToken;
  }

  async decrypt(token: string): Promise<DecrypterResult> {
    const decoded = new Promise<DecrypterResult>(async (resolve) => {
      await verify(token, this.secret, async (error, encoded: DecrypterResult) => {
        if (error) {
          resolve(null);
        }

        resolve(encoded);
      });
    });

    return decoded;
  }
}
