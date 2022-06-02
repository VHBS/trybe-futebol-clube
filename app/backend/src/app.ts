import * as express from 'express';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import IErrorMiddleware from './middlewares/interfaces/IErrorMiddleware';
import routes from './routes';

class App {
  public app: express.Express;
  private _error: IErrorMiddleware;

  constructor() {
    // ...
    this._error = new ErrorMiddleware();
    this.app = express();
    this.config();
    this.app.use(express.json());
    this.app.use(routes);
    this.app.use(this._error.server.bind(this._error));
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
