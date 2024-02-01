import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeMatch from './SequelizeMatch';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'id', as: 'homeTeamId' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'id', as: 'awayTeamId' });

SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId' });
SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId' });

export default SequelizeTeam;
