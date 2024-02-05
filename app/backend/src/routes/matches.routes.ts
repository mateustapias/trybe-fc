import { Request, Router, Response } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const matchesRouter = Router();

matchesRouter.get(
  '/',
  // AuthMiddleware.auth,
  (req: Request, res: Response) => matchController.listAll(req, res),
);

// matchesRouter.use(AuthMiddleware.auth);

matchesRouter.patch(
  '/:id/finish',
  AuthMiddleware.auth,
  (req: Request, res: Response) => matchController.endMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  AuthMiddleware.auth,
  (req: Request, res: Response) => matchController.updateScore(req, res),
);

matchesRouter.post(
  '/',
  AuthMiddleware.auth,
  (req: Request, res: Response) => matchController.addMatch(req, res),
);

export default matchesRouter;
