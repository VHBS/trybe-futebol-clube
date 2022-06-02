import { LoginServiceLogin, LoginServiceValidate } from '../types/TypesLoginService';

export default interface ILoginService {
  login(email: string, password: string): Promise<LoginServiceLogin>
  validate(authorization: string): LoginServiceValidate
}
