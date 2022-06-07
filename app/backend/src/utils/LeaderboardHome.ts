import { LeaderbordTeam } from '../services/types/LeaderbordTeam';
import Match from '../database/models/Match';

export default class LeaderboardHome {
  static create(match: Match) {
    if (match.homeTeamGoals > match.awayTeamGoals) return this.winnerCreate(match);
    if (match.homeTeamGoals < match.awayTeamGoals) return this.looserCreate(match);
    return this.drawCreate(match);
  }

  static winnerCreate({ teamHome, homeTeamGoals, awayTeamGoals }
  : Match): LeaderbordTeam {
    return {
      name: teamHome.teamName,
      totalPoints: 3,
      totalGames: 1,
      totalVictories: 1,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      goalsBalance: homeTeamGoals - awayTeamGoals,
      efficiency: Number(((3 / (1 * 3)) * 100).toFixed(2)),
    };
  }

  static looserCreate({ teamHome, homeTeamGoals, awayTeamGoals }
  : Match): LeaderbordTeam {
    return {
      name: teamHome.teamName,
      totalPoints: 0,
      totalGames: 1,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 1,
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      goalsBalance: homeTeamGoals - awayTeamGoals,
      efficiency: Number(((0 / (1 * 3)) * 100).toFixed(2)),
    };
  }

  static drawCreate({ teamHome, homeTeamGoals, awayTeamGoals }
  : Match): LeaderbordTeam {
    return {
      name: teamHome.teamName,
      totalPoints: 1,
      totalGames: 1,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      goalsBalance: homeTeamGoals - awayTeamGoals,
      efficiency: Number(((1 / (1 * 3)) * 100).toFixed(2)),
    };
  }

  static winnerUpdate(team:LeaderbordTeam, match: Match): LeaderbordTeam {
    const teamUpdated = this.updateHelper(team, match);
    teamUpdated.totalPoints += 3;
    teamUpdated.totalGames += 1;
    teamUpdated.totalVictories += 1;
    teamUpdated.efficiency = Number((((team.totalPoints + 3)
    / ((team.totalGames + 1) * 3)) * 100).toFixed(2));
    console.log(teamUpdated);
    return teamUpdated;
  }

  static looserUpdate(team:LeaderbordTeam, match: Match): LeaderbordTeam {
    const teamUpdated = this.updateHelper(team, match);
    teamUpdated.totalGames += 1;
    teamUpdated.totalLosses += 1;
    teamUpdated.efficiency = Number(((team.totalPoints
      / ((team.totalGames + 1) * 3)) * 100).toFixed(2));
    return teamUpdated;
  }

  static drawUpdate(team:LeaderbordTeam, match: Match): LeaderbordTeam {
    const teamUpdated = this.updateHelper(team, match);
    teamUpdated.totalPoints += 1;
    teamUpdated.totalGames += 1;
    teamUpdated.totalDraws += 1;
    teamUpdated.efficiency = Number((((team.totalPoints + 1)
    / ((team.totalGames + 1) * 3)) * 100).toFixed(2));
    return teamUpdated;
  }

  static updateHelper(team:LeaderbordTeam, match: Match): LeaderbordTeam {
    return {
      ...team,
      goalsFavor: team.goalsFavor + match.homeTeamGoals,
      goalsOwn: team.goalsOwn + match.awayTeamGoals,
      goalsBalance: (team.goalsFavor + match.homeTeamGoals)
      - (match.awayTeamGoals + team.goalsOwn),
    };
  }

  static updateHome(team:LeaderbordTeam, match: Match) {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return this.winnerUpdate(team, match);
    }
    if (match.homeTeamGoals < match.awayTeamGoals) {
      return this.looserUpdate(team, match);
    }
    return this.drawUpdate(team, match);
  }
}
