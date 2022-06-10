import LeaderboardAway from '../utils/LeaderboardAway';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { LeaderbordTeam } from './types/LeaderbordTeam';
import ILeaderBoardAwayService from './interfaces/ILeaderboardAwayService';

export default class LeaderboardAwayService implements ILeaderBoardAwayService {
  private _matchModel;

  constructor() {
    this._matchModel = Match;
  }

  public async away() {
    const matchesResult = await this._matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    const leaderBoardAway = this.makeLeaderBoardAway(matchesResult)
      .sort(this.organizeLeaderboard)
      .sort((a:LeaderbordTeam, b:LeaderbordTeam) => b.totalPoints - a.totalPoints);

    return { code: 200, message: leaderBoardAway };
  }

  public makeLeaderBoardAway = (matches: Match[]): LeaderbordTeam[] => {
    const teams = [] as { nome: string, index: number }[];
    const result = matches.reduce((acc, match, index) => {
      const teamOnBoardAway = teams.find(({ nome }) => nome === match.teamAway.teamName);
      if (!teamOnBoardAway) {
        teams.push({ nome: match.teamAway.teamName, index });
        acc.push(LeaderboardAway.create(match));
        return acc;
      }
      const leaderboardTeam = acc[teamOnBoardAway.index];
      acc[teamOnBoardAway.index] = LeaderboardAway.update(leaderboardTeam, match);
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
