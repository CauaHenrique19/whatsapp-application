import { Hasher, HasherComparer } from 'src/data/protocols/cryptography';
import { hash, compare } from 'bcrypt';

export class BcryptAdapter implements Hasher, HasherComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return await hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await compare(value, hash);
  }
}
