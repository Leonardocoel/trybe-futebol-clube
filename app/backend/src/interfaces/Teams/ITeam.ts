import Teams from '../../database/models/teams.model';
import { IScore } from '../Matches/IMatches';

export interface ITeam {
  id: number;
  teamName: string
}

export interface TeamWithMatches extends Teams {
  name: string,
  matchesHome: IScore[]
  matchesAway: IScore[]
}
