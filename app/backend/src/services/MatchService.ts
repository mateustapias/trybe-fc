import { ServiceResponse } from '../types/ServiceResponse';
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
}
