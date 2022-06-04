import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';

export default class LoginMidleware {
  private _loginService;

  constructor() {
    this._loginService = new LoginService();
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: 'All fields must be filled',
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { authorization } = req.headers;

      const result = this._loginService.validateToken(authorization);

      if (!authorization) return res.status(result.code).json(result.message);

      req.userData = result.message;
      next();
    } catch (e) {
      next(e);
    }
  }
}
