import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  private _password: string;
  private _username: string;
  private _role: string;
  private _email: string;
  private _id: number;

  get password(): string {
    return this._password;
  }

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get role(): string {
    return this._role;
  }

  get email(): string {
    return this._email;
  }

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
  modelName: 'user',
  timestamps: false,
});

export default User;
