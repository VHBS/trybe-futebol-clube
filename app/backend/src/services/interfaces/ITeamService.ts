import { TeamServiceGetAll, TeamServiceGetById } from '../types/TypesTeamService';

export default interface ITeamService {
  getAll(): Promise<TeamServiceGetAll>
  getById(id: number): Promise<TeamServiceGetById>
}
