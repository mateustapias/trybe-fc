import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderBoardService(),
  ) { }

  async listAll(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAllLeadboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async listAllinHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAllLeadboardinHome();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async listAllAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAllLeadboardAway();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
