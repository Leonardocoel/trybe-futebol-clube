import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/teams.service';

export default class TeamController {
  static async getAllTeams(req: Request, res: Response): Promise<void> {
    const teams = await TeamService.getAllTeams();

    res.status(StatusCodes.OK).json(teams);
  }

  static async getTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const team = await TeamService.getTeamById(Number(id));

    res.status(StatusCodes.OK).json(team);
  }
}
