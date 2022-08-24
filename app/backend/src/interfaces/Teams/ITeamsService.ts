import { ITeam } from './ITeam';

export interface ITeamsService {
  allTeams(): Promise<ITeam[]>
}
