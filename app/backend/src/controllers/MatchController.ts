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

  async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.endMatch(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateScore(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const {
      status,
      data,
    } = await this.matchService.updateScore(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async addMatch(req: Request, res: Response) {
    const { status, data } = await this.matchService.addMatch(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
