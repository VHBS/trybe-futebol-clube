import { NextFunction, Request, Response } from 'express';
import LeaderBoardHomeService from '../services/LeaderboardService';
import ILeaderboardController from './interfaces/ILeaderboardController';

export default class LeaderBoardController implements ILeaderboardController {
  private _leaderboardService;
  constructor() {
    this._leaderboardService = new LeaderBoardHomeService();
  }

  public async home(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await this._leaderboardService.home();
      return res.status(result.code).json(result.message);
    } catch (e) {
      next(e);
    }
  }
}
