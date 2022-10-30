import { Encrypter, HasherComparer } from 'src/data/protocols/cryptography';
import { hash, compare } from 'bcrypt';

export class BcryptAdapter implements Encrypter, HasherComparer {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    return await hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await compare(value, hash);
  }
}
