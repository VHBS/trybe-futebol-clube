import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatchService from './interfaces/IMatchService';
import {
  MatchServiceGetAll,
  MatchServiceCreate,
  MatchServiceUpdate,
} from './types/TypesMatchService';

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

  public async update(id: number): Promise<MatchServiceUpdate> {
    const result = await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    ) as number[];

    if (result[0] === 0) {
      return { code: 404,
        message: {
          message: 'Partida não encontrada ou já finalizada' } };
    }
    return { code: 200, message: { message: 'Finished' } };
  }
}
