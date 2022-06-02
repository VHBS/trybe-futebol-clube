import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';
import IJwt from './interfaces/IJwt';
import Secret from './JwtSecret';

export default class Jwt implements IJwt {
  private _secret: string;

  constructor() {
    this._secret = Secret.reader();
  }

  public sign(userData: User['userData']): string {
    return jwt.sign({ data: userData }, this._secret, { expiresIn: '7d', algorithm: 'HS256' });
  }

  public verify(token: string): jwt.JwtPayload {
    const jwtPayload = jwt.verify(token, this._secret) as jwt.JwtPayload;
    return jwtPayload;
  }
}
