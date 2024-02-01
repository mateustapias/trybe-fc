import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

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

  // async findAllInProgress(): Promise<IMatch[]> {
  //   const dbData = await this.model.findAll({
  //     where: {
  //       inProgress: true,
  //     },
  //     include: [
  //       { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
  //       { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
  //     ],
  //   });

  //   return dbData;
  // }
}
