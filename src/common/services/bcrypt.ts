import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  async isPasswordMatches(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed);
  }
}
