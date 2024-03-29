import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  async login(req: Request, res: Response) {
    const loginData = req.body;

    const { status, data } = await this.userService.login(loginData);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  static async getRole(req: Request, res: Response) {
    const { user } = res.locals;
    const { role } = user;

    return res.status(200).json({ role });
  }
}
