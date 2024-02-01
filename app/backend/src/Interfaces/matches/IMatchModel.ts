import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>
  findAllFiltered(inProgress: boolean): Promise<IMatch[]>
}
