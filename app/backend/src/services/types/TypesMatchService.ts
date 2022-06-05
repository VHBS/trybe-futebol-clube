import Match from '../../database/models/Match';

type MatchMessageService = {
  message: string
};

type MatchServiceGetAll = { code: number, message: Match[] };

type MatchServiceCreate = { code: number, message: Match };

type MatchServiceUpdate = { code: number, message: MatchMessageService };

export { MatchServiceGetAll, MatchServiceCreate, MatchServiceUpdate };
