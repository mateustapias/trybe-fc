import { ServiceResponse } from '../types/ServiceResponse';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

// type Side = 'home' | 'away' | undefined;

export default class LeaderBoardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) { }

  async getAllLeadboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.leaderboardModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  async getAllLeadboardinHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.leaderboardModel.findAll('home');

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  async getAllLeadboardAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.leaderboardModel.findAll('away');

    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
