import { JwtPayload } from 'jsonwebtoken';
import User from '../../database/models/User';

export default interface IJwt {
  sign(userData: User['userData']): string
  verify(token: string): string | JwtPayload
}
