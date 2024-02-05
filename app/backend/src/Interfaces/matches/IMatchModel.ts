import { IMatch, INewMatchData } from './IMatch';

export interface IMatchModel {
  findOne(id: number): Promise<IMatch | null>
  findAll(): Promise<IMatch[]>
  findAllFiltered(inProgress: boolean): Promise<IMatch[]>
  endMatch(id: number): Promise<void>
  patchGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
  addMatch(matchData: INewMatchData): Promise<IMatch>
}
