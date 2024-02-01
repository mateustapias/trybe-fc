import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  async listAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'false') {
      const { status, data } = await this.matchService.getAllMatches(false);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    if (inProgress === 'true') {
      const { status, data } = await this.matchService.getAllMatches(true);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    if (inProgress === undefined) {
      const { status, data } = await this.matchService.getAllMatches(undefined);
      return res.status(mapStatusHTTP(status)).json(data);
    }
  }
}
