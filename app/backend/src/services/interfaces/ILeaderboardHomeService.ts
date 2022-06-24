import Match from '../../database/models/Match';
import { LeaderboardServiceHome, LeaderbordTeam } from '../types/TypeLeaderbordService';

export default interface ILeaderBoardHomeService {
  home(): Promise<LeaderboardServiceHome>
  organizeLeaderboard(a: LeaderbordTeam, b: LeaderbordTeam): number
  makeLeaderBoardHome(matches: Match[]): LeaderbordTeam[]
}
