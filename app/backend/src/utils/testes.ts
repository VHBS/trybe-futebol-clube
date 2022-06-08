import { LeaderbordTeam } from '../services/types/LeaderbordTeam';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import LeaderBoard from './LeaderboardHome';

// ______________________________________________

// const matchPlay = {
//   homeTeam: 1,
//   homeTeamGoals: 1,
//   awayTeam: 2,
//   awayTeamGoals: 2,
//   inProgress: false,
// };

// const createMatch = async () => {
//   const result = await Match.create(matchPlay);
//   console.log(result);
// };

// const findMatch = async () => {
//   const result = await Match.findOne({ where: {
//     id: 50,
//   } });
//   console.log(result?.homeTeam);
// };

// const findAllMatch = async () => {
//   const result = await Match.findAll({
//     // where: { inProgress: true },
//     include: [
//       { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
//       { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
//     ],
//   });
//   console.log(result);
// };

// const makeTeamBoardWinner = (match: Match) => ({
//   name: match.teamHome.teamName,
//   totalPoints: 3,
//   totalGames: 1,
//   totalVictories: 1,
//   totalDraws: 0,
//   totalLosses: 0,
//   goalsFavor: match.homeTeamGoals,
//   goalsOwn: match.awayTeamGoals,
//   goalsBalance: match.homeTeamGoals - match.awayTeamGoals,
//   efficiency: Number(((3 / (1 * 3)) * 100).toFixed(2)),
// });

// const makeTeamBoardLooser = (match: Match) => ({
//   name: match.teamHome.teamName,
//   totalPoints: 0,
//   totalGames: 1,
//   totalVictories: 0,
//   totalDraws: 0,
//   totalLosses: 1,
//   goalsFavor: match.homeTeamGoals,
//   goalsOwn: match.awayTeamGoals,
//   goalsBalance: match.homeTeamGoals - match.awayTeamGoals,
//   efficiency: Number(((0 / (1 * 3)) * 100).toFixed(2)),
// });

// const makeTeamBoardDraw = (match: Match) => ({
//   name: match.teamHome.teamName,
//   totalPoints: 1,
//   totalGames: 1,
//   totalVictories: 0,
//   totalDraws: 1,
//   totalLosses: 0,
//   goalsFavor: match.homeTeamGoals,
//   goalsOwn: match.awayTeamGoals,
//   goalsBalance: match.homeTeamGoals - match.awayTeamGoals,
//   efficiency: Number(((1 / (1 * 3)) * 100).toFixed(2)),
// });

// const makeFirstBoardTeam = (match: Match) => {
//   if (match.homeTeamGoals > match.awayTeamGoals) {
//     return makeTeamBoardWinner(match);
//   } if (match.homeTeamGoals < match.awayTeamGoals) {
//     return makeTeamBoardLooser(match);
//   }
//   return makeTeamBoardDraw(match);
// };

// const updateTeamBoardWinner = (team:LeaderBord, match: Match) => ({
//   name: team.name,
//   totalPoints: team.totalPoints + 3,
//   totalGames: team.totalGames + 1,
//   totalVictories: team.totalVictories + 1,
//   totalDraws: team.totalDraws,
//   totalLosses: team.totalLosses,
//   goalsFavor: team.goalsFavor + match.homeTeamGoals,
//   goalsOwn: team.goalsOwn + match.awayTeamGoals,
//   goalsBalance: (team.goalsFavor + match.homeTeamGoals) - (match.awayTeamGoals + team.goalsOwn),
//   efficiency: Number((((team.totalPoints + 3) / ((team.totalGames + 1) * 3)) * 100).toFixed(2)),
// });

// const updateTeamBoardLooser = (team:LeaderBord, match: Match) => ({
//   name: team.name,
//   totalPoints: team.totalPoints + 0,
//   totalGames: team.totalGames + 1,
//   totalVictories: team.totalVictories + 0,
//   totalDraws: team.totalDraws,
//   totalLosses: team.totalLosses + 1,
//   goalsFavor: team.goalsFavor + match.homeTeamGoals,
//   goalsOwn: team.goalsOwn + match.awayTeamGoals,
//   goalsBalance: (team.goalsFavor + match.homeTeamGoals) - (match.awayTeamGoals + team.goalsOwn),
//   efficiency: Number((((team.totalPoints + 0) / ((team.totalGames + 1) * 3)) * 100).toFixed(2)),
// });

// const updateTeamBoardDraw = (team:LeaderBord, match: Match) => ({
//   name: team.name,
//   totalPoints: team.totalPoints + 1,
//   totalGames: team.totalGames + 1,
//   totalVictories: team.totalVictories + 0,
//   totalDraws: team.totalDraws + 1,
//   totalLosses: team.totalLosses,
//   goalsFavor: team.goalsFavor + match.homeTeamGoals,
//   goalsOwn: team.goalsOwn + match.awayTeamGoals,
//   goalsBalance: (team.goalsFavor + match.homeTeamGoals)
//     - (match.awayTeamGoals + team.goalsOwn),
//   efficiency: Number((((team.totalPoints + 1) / ((team.totalGames + 1) * 3)) * 100).toFixed(2)),
// });

// const updateTeamBoardHome = (team: LeaderBord, match: Match): LeaderBord => {
//   const resultado = team;
//   if (match.homeTeamGoals > match.awayTeamGoals) {
//     return updateTeamBoardWinner(resultado, match) as LeaderBord;
//   }
//   if (match.homeTeamGoals < match.awayTeamGoals) {
//     return updateTeamBoardLooser(resultado, match) as LeaderBord;
//   }
//   return updateTeamBoardDraw(resultado, match) as LeaderBord;
// };

// const checkBoardsTeams = (
//   acc: LeaderbordTeam[],
//   index:number,
//   curr: Match,
//   teams: { nome: string, index: number }[],
// ) => {
//   teams.push({ nome: curr.teamHome.teamName, index });
//   acc.push(LeaderBoard.create(curr, 'home'));
//   return acc;
// };

const verifyMatches = (
  matches: Match[],
) => {
  const teams = [] as { nome: string, index: number }[];
  const result = matches.reduce((acc, curr, index) => {
    const teamsOnBoardHome = teams.find(({ nome }) => nome === curr.teamHome.teamName);
    if (!teamsOnBoardHome) {
      teams.push({ nome: curr.teamHome.teamName, index });
      acc.push(LeaderBoard.create(curr));
      return acc;
    }
    acc[teamsOnBoardHome.index] = LeaderBoard.updateHome(acc[teamsOnBoardHome.index], curr);
    return acc;
  }, [] as LeaderbordTeam[]);
  return result;
};

const organizeLeaderboard = (a: LeaderbordTeam, b: LeaderbordTeam): number => {
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

const findAllMatchLeaderBoardHome = async () => {
  const maatchesResult = await Match.findAll({
    where: { inProgress: false },
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });
  const leaderBoardHome = verifyMatches(maatchesResult)
    .sort(organizeLeaderboard)
    .sort((a:LeaderbordTeam, b:LeaderbordTeam) => b.totalPoints - a.totalPoints);

  return { code: 200, message: leaderBoardHome };
};

// createMatch();
// findMatch();
// findAllMatchLeaderBoardHome();
export default findAllMatchLeaderBoardHome;
// findAllMatch();

// const allTeams = async () => {
//   const result = await Team.findAll();
//   console.log(result);
// };

// allTeams();

// ______________________________________________

// import User from '../database/models/user';
// const vitor = {
//   username: 'victor',
//   email: 'victorgow2@gmail.com',
//   password: '123456',
// };

// const userAll = async () => {
//   const result = await User.findAll();
//   console.log(result);
// };

// const createUser = async () => {
//   const result = await User.create(vitor);
//   console.log(result);
// };

// const findUser = async () => {
//   const result = await User.findOne({ where: {
//     email: vitor.email,
//   } });
//   console.log(result);
// };

// findUser();
// userAll();
// createUser();
