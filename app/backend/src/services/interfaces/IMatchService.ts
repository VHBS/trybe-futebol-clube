import Match from '../../database/models/Match';
import {
  MatchServiceCreate,
  MatchServiceGetAll,
  MatchServiceUpdate } from '../types/TypesMatchService';

export default interface IMatchService {
  verifyQuery(inProgress: string | undefined): Promise<MatchServiceGetAll>
  getAll(): Promise<MatchServiceGetAll>
  getAllInProgress(): Promise<MatchServiceGetAll>
  getAllEnded(): Promise<MatchServiceGetAll>
  create(match: Match): Promise<MatchServiceCreate>
  updateFinish(id: number): Promise<MatchServiceUpdate>
  updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<MatchServiceUpdate>
}
