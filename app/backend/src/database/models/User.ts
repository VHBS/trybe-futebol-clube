import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public password: string;
  public username: string;
  public role: string;
  public email: string;
  public id: number;

  get userData() {
    return {
      id: this.id,
      username: this.username,
      role: this.role,
      email: this.email,
    };
  }
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  timestamps: false,
});

export default User;
