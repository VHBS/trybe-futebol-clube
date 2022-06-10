import Match from '../../database/models/Match';
import { LeaderboardServiceHome, LeaderbordTeam } from '../types/LeaderbordTeam';

export default interface ILeaderBoardAwayService {
  away(): Promise<LeaderboardServiceHome>
  organizeLeaderboard(a: LeaderbordTeam, b: LeaderbordTeam): number
  makeLeaderBoardAway(matches: Match[]): LeaderbordTeam[]
}
