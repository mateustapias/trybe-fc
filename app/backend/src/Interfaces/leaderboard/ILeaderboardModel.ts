import { Side } from '../../types/Side';
import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardModel {
  findAll(side?: Side): Promise<ILeaderboard[]>
  // findAll(side?: 'home' | 'away'): Promise<ILeaderboard[]>
  // findAllInHome(): Promise<ILeaderboard[]>
  // findAllAway(): Promise<ILeaderboard[]>
}
