import { NextFunction, Request, Response } from 'express';

export default interface ILeaderboardController {
  home(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  away(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
