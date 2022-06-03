import MatchServiceGetAll from '../types/TypesMatchService';

export default interface IMatchService {
  verifyQuery(inProgress: string | undefined): Promise<MatchServiceGetAll>
  getAll(): Promise<MatchServiceGetAll>
  getAllInProgress(): Promise<MatchServiceGetAll>
  getAllEnded(): Promise<MatchServiceGetAll>
}
