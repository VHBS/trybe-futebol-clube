import { LoginServiceLogin, LoginServiceValidate } from '../types/TypesLogin';

export default interface ILoginService {
  login(email: string, password: string): Promise<LoginServiceLogin>
  validate(authorization: string): LoginServiceValidate
}
