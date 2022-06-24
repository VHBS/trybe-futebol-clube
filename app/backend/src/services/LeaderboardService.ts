import { LeaderbordTeam } from './types/TypeLeaderbordService';

export default class LeaderboardService {
  public homeAndAway(home: LeaderbordTeam[], away: LeaderbordTeam[]) {
    const result = home.reduce((acc, curr) => {
      const findTeam = away.find((team) => team.name === curr.name) as LeaderbordTeam;
      findTeam.totalPoints += curr.totalPoints;
      findTeam.totalGames += curr.totalGames;
      findTeam.totalVictories += curr.totalVictories;
      findTeam.totalDraws += curr.totalDraws;
      findTeam.totalLosses += curr.totalLosses;
      findTeam.goalsFavor += curr.goalsFavor;
      findTeam.goalsOwn += curr.goalsOwn;
      findTeam.goalsBalance = findTeam.goalsFavor - findTeam.goalsOwn;
      findTeam.efficiency = Number(((findTeam.totalPoints / (findTeam.totalGames * 3))
      * 100).toFixed(2));
      acc.push(findTeam);
      return acc;
    }, [] as LeaderbordTeam[])
      .sort(this.organizeLeaderboard)
      .sort((a:LeaderbordTeam, b:LeaderbordTeam) => b.totalPoints - a.totalPoints);

    return { code: 200, message: result };
  }

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
