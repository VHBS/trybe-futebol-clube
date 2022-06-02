import { TeamServiceGetAll, TeamServiceGetById } from '../types/TypesTeam';

export default interface ITeamService {
  getAll(): Promise<TeamServiceGetAll>
  getById(id: number): Promise<TeamServiceGetById>
}
