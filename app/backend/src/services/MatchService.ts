import { ServiceMessage, ServiceResponse } from '../types/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  async getAllMatches(
    inProgress: boolean | undefined = undefined,
  ): Promise<ServiceResponse<IMatch[]>> {
    let matchesArray: IMatch[] = [];
    if (inProgress === undefined) {
      matchesArray = await this.matchModel.findAll();
    } else {
      matchesArray = await this.matchModel.findAllFiltered(inProgress);
    }
    return { status: 'SUCCESSFUL', data: matchesArray };
  }

  async endMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.endMatch(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateScore(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.patchGoals(id, homeTeamGoals, awayTeamGoals);

    return { status: 'SUCCESSFUL', data: { message: 'Score updated' } };
  }
}
