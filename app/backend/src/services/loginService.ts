import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Secret from '../utils/jwtSecret';
import User from '../database/models/user';

export default class LoginService {
  private _userModel;

  constructor() {
    this._userModel = User;
  }

  public async login({ email, password }: { email: string, password: string }) {
    const user = await this._userModel.findOne({ where: { email } });

    if (!user) return { code: 401, message: { message: 'Incorrect email or password' } };

    const userPass = bcrypt
      .compareSync(password, user.password);

    if (!userPass) {
      return { code: 401, message: { message: 'Incorrect email or password' } };
    }

    const token = jwt.sign({
      data: user.userData }, Secret.reader(), { expiresIn: '7d', algorithm: 'HS256' });

    const teste = jwt.verify(token, Secret.reader());

    console.log(teste);
    return { code: 200, message: { user: user.userData, token } };
  }
}
