import { Router } from 'express';
import loginRouter from './loginRoute';
import teamRouter from './teamRoute';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/teams', teamRouter);

export default routes;
