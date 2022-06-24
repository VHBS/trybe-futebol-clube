import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter
  .get(
    '/home',
    leaderboardController.home.bind(leaderboardController),
  )
  .get(
    '/away',
    leaderboardController.away.bind(leaderboardController),
  )
  .get(
    '/',
    leaderboardController.homeAndAway.bind(leaderboardController),
  );

export default leaderboardRouter;
