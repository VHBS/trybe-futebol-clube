import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter
  .get(
    '/',
    teamController.getAll.bind(teamController),
  )
  .get(
    '/:id',
    teamController.getById.bind(teamController),
  );

export default teamRouter;
