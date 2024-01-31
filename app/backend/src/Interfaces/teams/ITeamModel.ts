import ITeam from './ITeam';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>;
}
