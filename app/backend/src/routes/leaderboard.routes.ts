import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
// import AuthMiddleware from '../middlewares/authMiddleware';

const leaderboardController = new LeaderboardController();
// const authMiddleware = new AuthMiddleware();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  // AuthMiddleware.auth,
  (req: Request, res: Response) => leaderboardController.listAll(req, res),
);

export default leaderboardRouter;
