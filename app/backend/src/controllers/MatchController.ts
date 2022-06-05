import { NextFunction, Request, Response } from 'express';
import Match from '../database/models/Match';
import MatchService from '../services/MatchService';
import IMatchController from './interfaces/IMatchController';

export default class MatchController implements IMatchController {
  private _matchService;

  constructor() {
    this._matchService = new MatchService();
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      const result = await this._matchService.verifyQuery(inProgress as string | undefined);
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const result = await this._matchService.create({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress } as Match);
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const result = await this._matchService.update(Number(id));
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }
}
