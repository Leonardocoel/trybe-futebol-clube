import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/teams.service';

export default class TeamController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const teams = await TeamService.allTeams();

    res.status(StatusCodes.OK).json(teams);
  }
}
