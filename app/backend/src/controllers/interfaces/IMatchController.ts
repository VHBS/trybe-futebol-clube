import { NextFunction, Request, Response } from 'express';

export default interface IMatchController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  create(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
