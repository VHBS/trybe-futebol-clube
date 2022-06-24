import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardAwayService from '../services/LeaderboardAwayService';
import LeaderboardHomeService from '../services/LeaderboardHomeService';
import ILeaderboardController from './interfaces/ILeaderboardController';

export default class LeaderboardController implements ILeaderboardController {
  private _leaderboardServiceHome;
  private _leaderboardServiceAway;
  private _leaderboardService;

  constructor() {
    this._leaderboardServiceHome = new LeaderboardHomeService();
    this._leaderboardServiceAway = new LeaderboardAwayService();
    this._leaderboardService = new LeaderboardService();
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

  public async homeAndAway(_req: Request, res: Response, next: NextFunction): Promise<Response
  | void> {
    try {
      const leaderboardAway = await this._leaderboardServiceAway.away();
      const leaderboardHome = await this._leaderboardServiceHome.home();
      const result = this._leaderboardService.homeAndAway(
        leaderboardHome.message,
        leaderboardAway.message,
      );
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }
}
