import { Router } from 'express';
import LoginMidleware from '../middlewares/LoginMiddleware';
import MatchController from '../controllers/MatchController';
import MatchMiddleware from '../middlewares/MatchMiddleware';

const matchRouter = Router();
const matchController = new MatchController();
const loginMiddleware = new LoginMidleware();
const matchMiddleware = new MatchMiddleware();

matchRouter
  .get(
    '/',
    matchController.getAll.bind(matchController),
  )
  .post(
    '/',
    loginMiddleware.validateToken.bind(loginMiddleware),
    MatchMiddleware.createMatchVerify.bind(MatchMiddleware),
    matchMiddleware.verifyTeamById.bind(matchMiddleware),
    matchController.create.bind(matchController),
  )
  .patch(
    '/:id/finish',
    matchController.update.bind(matchController),
  );

export default matchRouter;
