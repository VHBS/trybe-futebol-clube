import { Router } from 'express';
import loginRouter from './loginRoute';

const routes = Router();

routes.use('/login', loginRouter);

export default routes;
