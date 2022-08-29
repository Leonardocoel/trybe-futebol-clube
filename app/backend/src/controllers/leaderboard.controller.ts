import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async leaderboard(req: Request, res: Response): Promise<void> {
    const leaderboard = await LeaderboardService.result();

    res.status(StatusCodes.OK).json(leaderboard);
  }

  static async leaderboardHome(req: Request, res: Response): Promise<void> {
    const leaderboard = await LeaderboardService.home();

    res.status(StatusCodes.OK).json(leaderboard);
  }

  static async leaderboardAway(req: Request, res: Response): Promise<void> {
    const leaderboard = await LeaderboardService.away();

    res.status(StatusCodes.OK).json(leaderboard);
  }
}
