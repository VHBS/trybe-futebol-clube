import LeaderboardHome from '../utils/LeaderboardHome';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { LeaderbordTeam } from './types/LeaderbordTeam';
import ILeaderBoardHomeService from './interfaces/ILeaderboardService';

export default class LeaderBoardHomeService implements ILeaderBoardHomeService {
  private _matchModel;

  constructor() {
    this._matchModel = Match;
  }

  public async home() {
    const matchesResult = await this._matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    const leaderBoardHome = this.makeLeaderBoardHome(matchesResult)
      .sort(this.organizeLeaderboard)
      .sort((a:LeaderbordTeam, b:LeaderbordTeam) => b.totalPoints - a.totalPoints);

    return { code: 200, message: leaderBoardHome };
  }

  public makeLeaderBoardHome = (matches: Match[]): LeaderbordTeam[] => {
    const teams = [] as { nome: string, index: number }[];
    const result = matches.reduce((acc, match, index) => {
      const teamOnBoardHome = teams.find(({ nome }) => nome === match.teamHome.teamName);
      if (!teamOnBoardHome) {
        teams.push({ nome: match.teamHome.teamName, index });
        acc.push(LeaderboardHome.create(match));
        return acc;
      }
      const leaderboardTeam = acc[teamOnBoardHome.index];
      acc[teamOnBoardHome.index] = LeaderboardHome.update(leaderboardTeam, match);
      return acc;
    }, [] as LeaderbordTeam[]);
    return result;
  };

  public organizeLeaderboard = (a: LeaderbordTeam, b: LeaderbordTeam): number => {
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    return 0;
  };
}
