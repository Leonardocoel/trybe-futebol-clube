import validateTeams from '../helpers/ValidateNewMatches';
import { IMatch, IScore } from '../interfaces/Matches/IMatches';
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
    await validateTeams(newMatch);

    const match = await Matches.create(newMatch);

    return match;
  }

  static async finishMatch(id: string) {
    await Matches.update({ inProgress: false }, { where: { id } });
  }

  static async updateScore(id: string, score: IScore) {
    await Matches.update(score, { where: { id } });
  }
}
