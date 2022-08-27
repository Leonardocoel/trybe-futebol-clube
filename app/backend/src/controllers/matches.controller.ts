import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;

    const matches = await MatchesService.getAllMatches(inProgress as string);

    res.status(StatusCodes.OK).json(matches);
  }

  static async createMatch(req: Request, res: Response): Promise<void> {
    const newMatch = req.body;

    const match = await MatchesService.createMatch(newMatch);

    res.status(StatusCodes.CREATED).json(match);
  }

  static async finishMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await MatchesService.finishMatch(id);

    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await MatchesService.updateScore(id, req.body);

    res.status(StatusCodes.OK).json({ message: 'Updated' });
  }
}
