import MatchServiceGetAll from '../types/TypesMatchService';

export default interface IMatchService {
  getAll(): Promise<MatchServiceGetAll>
}
