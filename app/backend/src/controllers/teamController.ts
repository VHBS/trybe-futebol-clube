import { Request, Response } from 'express';
import Team from '../database/models/Team';
// import LoginService from '../services/loginService';

export default class TeamController {
  private _teamModel;

  constructor() {
    this._teamModel = Team;
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      // const result = await this._loginService.login({ email, password });
      const result = await this._teamModel.findAll();
      return res.status(200).json(result);
      // return res.status(result.code).json(result.message);
    } catch (e) {
      return res.status(500).json({ message: 'ops!' });
    }
  }

  // public async validate(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { authorization } = req.headers;

  //     if (!authorization) return res.status(500).json({ message: 'ops!' });

  //     const result = this._loginService.validate({ authorization });

  //     return res.status(result.code).json(result.message);
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({ message: 'ops!' });
  //   }
  // }
}
