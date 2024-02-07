import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import SequelizeMatch from '../database/models/SequelizeMatch';
import getLeaderboard from '../utils/leaderboardGetters';
import { Side } from '../types/Side';

export default class LeaderboardModel implements ILeaderboardModel {
  private matchModel = SequelizeMatch;
  private teamModel = SequelizeTeam;

  async findAll(side?: Side): Promise<ILeaderboard[]> {
    const teamsDBData = await this.teamModel.findAll();
    const matchesDBData = await this.matchModel.findAll();

    const leaderboardData = getLeaderboard(teamsDBData, matchesDBData, side);

    return leaderboardData;
  }
}
