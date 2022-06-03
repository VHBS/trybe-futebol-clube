import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter
  .get(
    '/',
    matchController.getAll.bind(matchController),
  );

export default matchRouter;
