import { Model, QueryInterface, DataTypes } from 'sequelize';
import ITeam from '../../Interfaces/teams/ITeam';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};