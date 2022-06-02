import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';
import ILoginController from './interfaces/ILoginController';

export default class LoginController implements ILoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const result = await this._loginService.login(email, password);
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }

  public async validate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { authorization } = req.headers;

      if (!authorization) return res.status(500).json({ message: 'Token não encontratop' });

      const result = this._loginService.validate(authorization);

      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }
}
