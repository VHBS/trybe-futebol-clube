import { NextFunction, Request, Response } from 'express';
import LeaderboardAwayService from '../services/LeaderboardAwayService';
import LeaderboardHomeService from '../services/LeaderboardHomeService';
import ILeaderboardController from './interfaces/ILeaderboardController';

export default class LeaderboardController implements ILeaderboardController {
  private _leaderboardServiceHome;
  private _leaderboardServiceAway;

  constructor() {
    this._leaderboardServiceHome = new LeaderboardHomeService();
    this._leaderboardServiceAway = new LeaderboardAwayService();
  }

  public async home(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this._leaderboardServiceHome.home();
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }

  public async away(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this._leaderboardServiceAway.away();
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }
}
