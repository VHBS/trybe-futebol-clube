import {
  LoginServiceLogin,
  LoginServiceValidateRole,
  LoginServiceValidateToken,
} from '../types/TypesLoginService';

export default interface ILoginService {
  login(email: string, password: string): Promise<LoginServiceLogin>
  validateRole(authorization: string | undefined): LoginServiceValidateRole
  validateToken(authorization: string | undefined): LoginServiceValidateToken
}
