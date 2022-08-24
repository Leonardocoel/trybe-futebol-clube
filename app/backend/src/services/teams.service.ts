import Teams from '../database/models/teams.model';
import { ITeam } from '../interfaces/Teams/ITeam';

export default class TeamService {
  static async getAllTeams(): Promise<ITeam[]> {
    const teams = await Teams.findAll({ raw: true });

    return teams;
  }

  static async getTeamById(id: number): Promise<ITeam> {
    const team = await Teams.findByPk(id);

    return team as ITeam;
  }
}
