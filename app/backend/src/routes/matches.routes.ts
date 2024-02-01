import { Request, Router, Response } from 'express';
// import AuthMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const matchesRouter = Router();

matchesRouter.get(
  '/',
  // AuthMiddleware.auth,
  (req: Request, res: Response) => matchController.listAll(req, res),
);

export default matchesRouter;
