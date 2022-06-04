import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatchService from './interfaces/IMatchService';
import { MatchServiceGetAll, MatchServiceCreate } from './types/TypesMatchService';

export default class MatchService implements IMatchService {
  private _matchModel;

  constructor() {
    this._matchModel = Match;
  }

  public async verifyQuery(inProgress: string | undefined): Promise<MatchServiceGetAll> {
    if (inProgress === 'true') {
      return this.getAllInProgress();
    }
    if (inProgress === 'false') {
      return this.getAllEnded();
    }
    return this.getAll();
  }

  public async getAll() {
    const result = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: 200, message: result };
  }

  public async getAllInProgress() {
    const result = await this._matchModel.findAll({
      where: { inProgress: true },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: 200, message: result };
  }

  public async getAllEnded(): Promise<MatchServiceGetAll> {
    const result = await this._matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: 200, message: result };
  }

  public async create(match: Match): Promise<MatchServiceCreate> {
    const result = await this._matchModel.create(match);
    return { code: 201, message: result };
  }
}
