import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatch, INewMatchData } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findOne(id: number): Promise<IMatch | null> {
    const dbData = await this.model.findOne({
      where: {
        id,
      },
    });
    return dbData;
  }

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async findAllFiltered(inProgress: boolean): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async endMatch(id: number): Promise<void> {
    await this.model.update({
      inProgress: false,
    }, {
      where: {
        id,
      },
    });
  }

  async patchGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update({
      homeTeamGoals, awayTeamGoals,
    }, {
      where: {
        id,
      },
    });
  }

  async addMatch(matchData: INewMatchData): Promise<IMatch> {
    const dbData = await this.model.create({ ...matchData, inProgress: true });

    return dbData;
  }
}
