import Match from '../../database/models/Match';

type MatchServiceGetAll = { code: number, message: Match[] };

type MatchServiceCreate = { code: number, message: Match };

export { MatchServiceGetAll, MatchServiceCreate };
