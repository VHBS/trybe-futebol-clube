import Team from '../../database/models/Team';

const allTeams = [
	{
		id: 1,
		teamName: "Avaí/Kindermann"
	},
	{
		id: 2,
		teamName: "Bahia"
	},
	{
		id: 3,
		teamName: "Botafogo"
	}
] as Team[]

const team = {
  id: 1,
  teamName: "Avaí/Kindermann"
} as Team

export { allTeams, team }