import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default class MatchMiddleware {
  private _teamService;

  constructor() {
    this._teamService = new TeamService();
  }

  static async createMatchVerify(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }

  public async verifyTeamById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeam, awayTeam } = req.body;
    const checkAwayTeam = await this._teamService.getByIds(Number(homeTeam), Number(awayTeam));
    if (!checkAwayTeam[0] || !checkAwayTeam[1]) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}
