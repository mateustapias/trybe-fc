import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validationMiddleware';
import AuthMiddleware from '../middlewares/authMiddleware';

const userController = new UserController();
// const authMiddleware = new AuthMiddleware();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);
loginRouter.get(
  '/role',
  AuthMiddleware.auth,
  (req: Request, res: Response) => UserController.getRole(req, res),
);

export default loginRouter;
