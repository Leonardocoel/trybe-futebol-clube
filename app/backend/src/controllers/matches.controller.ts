import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;

    const matches = await MatchesService.getAllMatches(inProgress as string);

    res.status(StatusCodes.OK).json(matches);
  }
}
