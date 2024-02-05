import { ServiceMessage, ServiceResponse } from '../types/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { IMatch, INewMatchData } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  private async getTeams(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const foundTeams = await Promise.all([homeTeamId, awayTeamId].map(async (id) => {
      const foundTeam = await this.matchModel.findOne(id);
      if (!foundTeam) {
        return false;
      }
      return true;
    }));

    const teamsExists = foundTeams.every((team) => team);

    return teamsExists;
  }

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

  async addMatch(matchData: INewMatchData): Promise<ServiceResponse<IMatch>> {
    const teamsExists = await this.getTeams(matchData.homeTeamId, matchData.awayTeamId);

    if (!teamsExists) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.addMatch(matchData);

    return { status: 'CREATED', data: newMatch };
  }
}
