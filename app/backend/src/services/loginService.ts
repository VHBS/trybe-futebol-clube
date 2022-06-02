import * as bcrypt from 'bcryptjs';
import Jwt from '../utils/Jwt';
import User from '../database/models/User';
import ILoginService from './interfaces/ILoginService';

export default class LoginService extends Jwt implements ILoginService {
  private _userModel;

  constructor() {
    super();
    this._userModel = User;
  }

  public async login(email: string, password: string) {
    const user = await this._userModel.findOne({ where: { email } });

    if (!user) return { code: 401, message: { message: 'Incorrect email or password' } };

    const userPass = bcrypt
      .compareSync(password, user.password);

    if (!userPass) {
      return { code: 401, message: { message: 'Incorrect email or password' } };
    }

    const token = this.sign(user.userData);

    return { code: 200, message: { user: user.userData, token } };
  }

  public validate(authorization:string) {
    const { data: { role } } = this.verify(authorization);

    return { code: 200, message: role };
  }
}
