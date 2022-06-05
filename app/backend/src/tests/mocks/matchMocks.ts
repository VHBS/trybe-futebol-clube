import Match from '../../database/models/Match';

const allMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo",
    },
    teamAway: {
      teamName: "Internacional"
    }
  }
] as Match[];

const allMatchesInProgress = [
	{
		id: 41,
		homeTeam: 16,
		homeTeamGoals: 2,
		awayTeam: 9,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: "São Paulo"
		},
		teamAway: {
			teamName: "Internacional"
		}
	},
	{
		id: 42,
		homeTeam: 6,
		homeTeamGoals: 1,
		awayTeam: 1,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: "Ferroviária"
		},
		teamAway: {
			teamName: "Avaí/Kindermann"
		}
	}
] as Match[];

const allMatchesEnded = [
	{
		id: 1,
		homeTeam: 16,
		homeTeamGoals: 1,
		awayTeam: 8,
		awayTeamGoals: 1,
		inProgress: false,
		teamHome: {
			teamName: "São Paulo"
		},
		teamAway: {
			teamName: "Grêmio"
		}
	},
	{
		id: 2,
		homeTeam: 9,
		homeTeamGoals: 1,
		awayTeam: 14,
		awayTeamGoals: 1,
		inProgress: false,
		teamHome: {
			teamName: "Internacional"
		},
		teamAway: {
			teamName: "Santos"
		}
	}
] as Match[];

const resultNewMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true
} as Match;

const requestNewMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
} as Match

const badRequestNewMatch = {
  homeTeam: 16,
  awayTeam: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
} as Match



export { allMatches, allMatchesInProgress, allMatchesEnded, resultNewMatch, requestNewMatch, badRequestNewMatch }