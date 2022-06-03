import { Router } from 'express';
import loginRouter from './loginRoute';
import teamRouter from './teamRoute';
import matchRouter from './matchRoute';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/teams', teamRouter);
routes.use('/matches', matchRouter);

export default routes;
