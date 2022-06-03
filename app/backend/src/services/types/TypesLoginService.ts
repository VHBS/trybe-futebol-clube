import User from '../../database/models/User';

// Subtipos presentes nos tipos retornados em LoginService

type MessageLoginSuccess = {
  user: User['userData'],
  token: string,
};

type MessageLoginFail = {
  message: string,
};

// Tipos dos resultados retornados em LoginService

type LoginServiceLogin = {
  code: number,
  message: MessageLoginSuccess | MessageLoginFail,
};

type LoginServiceValidateRole = {
  code: number,
  message: string,
};

type LoginServiceValidateToken = {
  code: number,
  message: MessageLoginFail | User['userData'],
};

export { LoginServiceLogin, LoginServiceValidateRole, LoginServiceValidateToken };
