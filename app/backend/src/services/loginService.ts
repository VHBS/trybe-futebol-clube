import * as bcrypt from 'bcrypt';
import Jwt from '../utils/Jwt';
import User from '../database/models/User';

export default class LoginService extends Jwt {
  private _userModel;

  constructor() {
    super();
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

    const token = this.sign(user.userData);

    return { code: 200, message: { user: user.userData, token } };
  }

  public validate({ authorization }: { authorization: string }) {
    const { data: { role } } = this.verify(authorization);

    return { code: 200, message: role };
  }
}
