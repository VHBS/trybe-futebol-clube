import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import IErrorMiddleware from './interfaces/IErrorMiddleware';

export default class ErrorMiddleware implements IErrorMiddleware {
  private _code: number;
  private _message: string;

  constructor() {
    this._code = 500;
    this._message = 'Erro inesperado';
  }

  async server(
    _err: ErrorRequestHandler,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response> {
    return res.status(this._code).json({ message: this._message });
  }
}
