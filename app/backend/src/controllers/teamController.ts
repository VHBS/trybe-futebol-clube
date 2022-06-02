import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  private _teamService;

  constructor() {
    this._teamService = new TeamService();
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const result = await this._teamService.getAll();
      return res.status(result.code).json(result.message);
    } catch (e) {
      return res.status(500).json({ message: 'ops!' });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await this._teamService.getById(id);
      return res.status(result.code).json(result.message);
    } catch (e) {
      return res.status(500).json({ message: 'ops!' });
    }
  }
}
