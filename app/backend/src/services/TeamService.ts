import Team from '../database/models/Team';
import ITeamService from './interfaces/ITeamService';

export default class TeamService implements ITeamService {
  private _teamModel;

  constructor() {
    this._teamModel = Team;
  }

  public async getAll() {
    const result = await this._teamModel.findAll();
    return { code: 200, message: result };
  }

  public async getById(id: number) {
    const result = await this._teamModel.findOne({ where: { id } });
    if (!result) return { code: 404, message: { message: 'Time não encontrado' } };
    return { code: 200, message: result };
  }
}
