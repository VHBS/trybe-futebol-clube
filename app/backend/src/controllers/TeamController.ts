import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';
import ITeamController from './interfaces/ITeamController';

export default class TeamController implements ITeamController {
  private _teamService;

  constructor() {
    this._teamService = new TeamService();
  }

  public async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this._teamService.getAll();
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const result = await this._teamService.getById(id);
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }
}
