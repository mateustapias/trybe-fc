import { Side } from '../../types/Side';
import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardModel {
  findAll(side?: Side): Promise<ILeaderboard[]>
}
