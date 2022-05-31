import { Request, Response } from 'express';

export default class LoginController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      return res.status(200).json({ email, password });
    } catch (e) {
      return res.status(500).json({ message: 'ops!' });
    }
  }
}
