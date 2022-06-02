import Team from '../../database/models/Team';

type TeamServiceGetAll = { code: number, message: Team[] };

type TeamServiceGetById = { code: number, message: Team };

export { TeamServiceGetAll, TeamServiceGetById };
