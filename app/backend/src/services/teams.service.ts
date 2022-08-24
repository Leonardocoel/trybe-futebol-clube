import Teams from '../database/models/teams.model';
import { ITeam } from '../interfaces/Teams/ITeam';

export default class TeamService {
  static async allTeams(): Promise<ITeam[]> {
    const teams = await Teams.findAll({ raw: true });

    return teams;
  }
}
