import Team from '../database/models/Team';

export default class TeamService {
  private _teamModel;

  constructor() {
    this._teamModel = Team;
  }

  public async getAll() {
    const result = await this._teamModel.findAll();
    return { code: 200, message: result };
  }

  public async getById(id: string) {
    const result = await this._teamModel.findOne({ where: { id } });
    return { code: 200, message: result };
  }
}
