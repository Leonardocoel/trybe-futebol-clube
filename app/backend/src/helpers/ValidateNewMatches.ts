import TeamService from '../services/teams.service';
import { IMatch } from '../interfaces/Matches/IMatches';

const validateTeams = async ({ homeTeam, awayTeam }: IMatch): Promise<void> => {
  if (homeTeam === awayTeam) {
    const error = new Error('It is not possible to create a match with two equal teams');
    error.name = 'UNAUTHORIZED';
    throw error;
  }

  const teamHome = await TeamService.getTeamById(homeTeam);
  const teamAway = await TeamService.getTeamById(awayTeam);

  if (!teamHome || !teamAway) {
    const error = new Error('There is no team with such id!');
    error.name = 'NOT_FOUND';
    throw error;
  }
};

export default validateTeams;
