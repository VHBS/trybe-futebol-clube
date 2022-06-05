import { Request, Response, NextFunction } from 'express';

export default class MatchMiddleware {
  static async createMatchVerify(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { homeTeam, awayTeam } = req.body;
      if (homeTeam === awayTeam) {
        return res.status(401).json({
          message: 'It is not possible to create a match with two equal teams' });
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
