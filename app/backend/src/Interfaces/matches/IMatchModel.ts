import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>
  findAllFiltered(inProgress: boolean): Promise<IMatch[]>
  endMatch(id: number): Promise<void>
  patchGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
}
