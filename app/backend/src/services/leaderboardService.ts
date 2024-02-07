import { ServiceResponse } from '../types/ServiceResponse';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderBoardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) { }

  async getAllLeadboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.leaderboardModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
