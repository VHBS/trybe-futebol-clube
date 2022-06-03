import Team from '../../database/models/Team';

// Subtipos presentes nos tipos retornados em LoginService

type MessageTeamIdFail = { message: string };

// Tipos dos resultados retornados em LoginService

type TeamServiceGetAll = { code: number, message: Team[] };

type TeamServiceGetById = { code: number, message: Team | MessageTeamIdFail };

export { TeamServiceGetAll, TeamServiceGetById };
