// Subtipos presentes nos tipos retornados em LoginService

type LeaderbordTeam = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

// Tipos dos resultados retornados em LoginService

type LeaderboardServiceHome = {
  code: number,
  message: LeaderbordTeam[]
};

export { LeaderbordTeam, LeaderboardServiceHome };
