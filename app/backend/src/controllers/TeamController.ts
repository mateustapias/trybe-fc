import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  async listAll(req: Request, res: Response) {
    const { status, data } = await this.teamService.getAllTeams();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async listOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { status, data } = await this.teamService.getTeamById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
