import * as jwt from 'jsonwebtoken';
import User from '../database/models/user';
import Secret from './jwtSecret';

export default class Jwt {
  static sign(userData: User['userData']) {
    return jwt.sign({ data: userData }, Secret.reader(), { expiresIn: '7d', algorithm: 'HS256' });
  }

  static verify(token: string) {
    return jwt.verify(token, Secret.reader());
  }
}
