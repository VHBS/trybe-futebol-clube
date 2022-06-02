import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  private _id: number;
  private _homeTeam: number;
  private _homeTeamGoals: number;
  private _awayTeam: number;
  private _awayTeamGoals: number;
  private _inProgress: boolean;
  private _teamHome: { teamName: string };
  private _teamAway: { teamName: string };

  get id(): number {
    return this._id;
  }

  get homeTeam(): number {
    return this._homeTeam;
  }

  get homeTeamGoals(): number {
    return this._homeTeamGoals;
  }

  get awayTeam(): number {
    return this._awayTeam;
  }

  get awayTeamGoals(): number {
    return this._awayTeamGoals;
  }

  get inProgress(): boolean {
    return this._inProgress;
  }

  get teamHome(): { teamName: string } {
    return { teamName: this._teamHome.teamName };
  }

  get teamAway(): { teamName: string } {
    return { teamName: this._teamAway.teamName };
  }
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
