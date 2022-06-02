import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter
  .get(
    '/',
    teamController.getAll.bind(teamController),
  );

export default teamRouter;
