import { Router } from 'express';
import LoginMidleware from '../middlewares/LoginMiddleware';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();
const loginMiddleware = new LoginMidleware();

matchRouter
  .get(
    '/',
    matchController.getAll.bind(matchController),
  )
  .post(
    '/',
    loginMiddleware.validateToken.bind(loginMiddleware),
    matchController.create.bind(matchController),
  );

export default matchRouter;
