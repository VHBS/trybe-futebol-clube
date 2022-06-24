import { LeaderbordTeam } from '../services/types/TypeLeaderbordService';
import Match from '../database/models/Match';

export default class LeaderboardHome {
  static create(match: Match) {
    if (match.homeTeamGoals > match.awayTeamGoals) return this.winnerCreate(match);
    if (match.homeTeamGoals < match.awayTeamGoals) return this.looserCreate(match);
    return this.drawCreate(match);
  }

  static update(team:LeaderbordTeam, match: Match) {
    if (match.homeTeamGoals > match.awayTeamGoals) return this.winnerUpdate(team, match);
    if (match.homeTeamGoals < match.awayTeamGoals) return this.looserUpdate(team, match);
    return this.drawUpdate(team, match);
  }

  static updateStart(team:LeaderbordTeam, match: Match): LeaderbordTeam {
    return {
      ...team,
      goalsFavor: team.goalsFavor + match.homeTeamGoals,
      goalsOwn: team.goalsOwn + match.awayTeamGoals,
      goalsBalance: (team.goalsFavor + match.homeTeamGoals)
      - (match.awayTeamGoals + team.goalsOwn),
    };
  }

  static efficiencyCalculate(totalPoits:number, totalGames: number) {
    return Number(((totalPoits / (totalGames * 3)) * 100).toFixed(2));
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
      efficiency: this.efficiencyCalculate(3, 1),
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
      efficiency: this.efficiencyCalculate(0, 1),
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
      efficiency: this.efficiencyCalculate(1, 1),
    };
  }

  static winnerUpdate(team:LeaderbordTeam, match: Match): LeaderbordTeam {
    const teamUpdated = this.updateStart(team, match);
    const totalPointsUpdated = teamUpdated.totalPoints + 3;
    const totalGamesUpdated = teamUpdated.totalGames + 1;
    teamUpdated.totalPoints = totalPointsUpdated;
    teamUpdated.totalGames = totalGamesUpdated;
    teamUpdated.totalVictories += 1;
    teamUpdated.efficiency = this.efficiencyCalculate(totalPointsUpdated, totalGamesUpdated);
    return teamUpdated;
  }

  static looserUpdate(team:LeaderbordTeam, match: Match): LeaderbordTeam {
    const teamUpdated = this.updateStart(team, match);
    const totalGamesUpdated = teamUpdated.totalGames + 1;
    teamUpdated.totalGames = totalGamesUpdated;
    teamUpdated.totalLosses += 1;
    teamUpdated.efficiency = this.efficiencyCalculate(team.totalPoints, totalGamesUpdated);
    return teamUpdated;
  }

  static drawUpdate(team:LeaderbordTeam, match: Match): LeaderbordTeam {
    const teamUpdated = this.updateStart(team, match);
    const totalPointsUpdated = teamUpdated.totalPoints + 1;
    const totalGamesUpdated = teamUpdated.totalGames + 1;
    teamUpdated.totalPoints = totalPointsUpdated;
    teamUpdated.totalGames = totalGamesUpdated;
    teamUpdated.totalDraws += 1;
    teamUpdated.efficiency = this.efficiencyCalculate(totalPointsUpdated, totalGamesUpdated);
    return teamUpdated;
  }
}
