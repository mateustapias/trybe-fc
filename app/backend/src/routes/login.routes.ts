import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validationMiddleware';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default loginRouter;
