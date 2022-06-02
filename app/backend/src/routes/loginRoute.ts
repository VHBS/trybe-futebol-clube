import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMidleware from '../middlewares/LoginMiddleware';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter
  .post(
    '/',
    LoginMidleware.login.bind(LoginMidleware),
    loginController.login.bind(loginController),
  )
  .get(
    '/validate',
    loginController.validate.bind(loginController),
  );

export default loginRouter;
