import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', loginController.login.bind(loginController));

export default loginRouter;
