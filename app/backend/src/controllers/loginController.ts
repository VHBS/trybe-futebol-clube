import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await this._loginService.login({ email, password });
      return res.status(result.code).json(result.message);
    } catch (e) {
      return res.status(500).json({ message: 'ops!' });
    }
  }
}
