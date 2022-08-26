import { IMatch } from '../interfaces/Matches/IMatches';
import Matches from '../database/models/matches.model';

export default class MatchesService {
  static async getAllMatches(isInProgress?: string) {
    const matches = await Matches.findAll({
      include: [
        { association: 'teamHome', attributes: { exclude: ['id'] } },
        { association: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: (isInProgress === undefined) ? {}
        : { inProgress: JSON.parse(isInProgress) },
    });

    return matches;
  }

  static async createMatch(newMatch: IMatch) {
    const match = await Matches.create(newMatch);

    return match;
  }

  static async finishMatch(id: string) {
    await Matches.update({ inProgress: false }, { where: { id } });
  }
}
