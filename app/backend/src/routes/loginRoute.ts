import { Router } from 'express';
import LoginController from '../controllers/loginController';
import LoginMidleware from '../middlewares/loginMiddleware';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  LoginMidleware.login.bind(LoginMidleware),
  loginController.login.bind(loginController),
);

export default loginRouter;
