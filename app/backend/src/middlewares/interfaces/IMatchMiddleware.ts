import { NextFunction, Request, Response } from 'express';

export default interface IMatchMiddleware {
  verifyTeamById(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
