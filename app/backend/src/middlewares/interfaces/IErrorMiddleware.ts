import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export default interface IErrorMiddleware {
  server(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>
}
