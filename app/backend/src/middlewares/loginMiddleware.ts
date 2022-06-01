import { Request, Response, NextFunction } from 'express';

export default class LoginMidleware {
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
}
