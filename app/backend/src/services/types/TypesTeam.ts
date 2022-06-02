import Team from '../../database/models/Team';

type TeamServiceGetAll = { code: string, message: Team[] };

type TeamServiceGetById = { code: string, message: Team };

export { TeamServiceGetAll, TeamServiceGetById };
