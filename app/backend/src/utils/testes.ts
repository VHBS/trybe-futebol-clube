// import Match from '../database/models/Match';
// import Team from '../database/models/Team';

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
//     include: [
//       { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
//       { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
//     ],
//   });
//   console.log(result[0]);
// };

// createMatch();
// findMatch();
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

// const teste = User.build(vitor);

// console.log(teste);
