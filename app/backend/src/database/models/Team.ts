import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  private _id: number;
  private _teamName: string;

  get id(): number {
    return this._id;
  }

  get teamName(): string {
    return this._teamName;
  }
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
});

export default Team;
