import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderBoardService(),
  ) { }

  async listAllinHome(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAllLeadboardinHome();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async listAllAway(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAllLeadboardAway();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
