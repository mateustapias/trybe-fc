import Team from './ITeam';

export interface ITeamModel {
  findAll(): Promise<Team[]>;
}
