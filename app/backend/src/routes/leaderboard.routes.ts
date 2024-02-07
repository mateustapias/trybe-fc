import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/',
  (req: Request, res: Response) => leaderboardController.listAll(req, res),
);

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.listAllinHome(req, res),
);

leaderboardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.listAllAway(req, res),
);

export default leaderboardRouter;
