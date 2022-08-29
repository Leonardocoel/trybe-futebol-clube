// import ILeaderboard from '../interfaces/ILeaderboard';
import { TeamWithMatches } from '../interfaces/Teams/ITeam';
import GetLeaderboard from '../helpers/GetLeaderboard';
import TeamService from './teams.service';
import sort from '../helpers/sort';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardService {
  static async result() {
    const teams = await TeamService.getAllTeamsEager();

    const leaderboard = teams.map(({ teamName, matchesHome, matchesAway }: TeamWithMatches) => {
      const { home, away } = {
        home: matchesHome.map(({ homeTeamGoals, awayTeamGoals }) => [homeTeamGoals, awayTeamGoals]),
        away: matchesAway.map(({ homeTeamGoals, awayTeamGoals }) => [awayTeamGoals, homeTeamGoals]),
      };
      const { allStatus } = new GetLeaderboard([...home, ...away]);

      return {
        name: teamName,
        ...allStatus as Omit<ILeaderboard, 'name'>,
      };
    });

    sort(leaderboard);

    return leaderboard;
  }

  static async away() {
    const teams = await TeamService.getAllTeamsEager();

    const leaderboard = teams.map(({ teamName, matchesAway }: TeamWithMatches) => {
      const away = matchesAway.map(({ homeTeamGoals, awayTeamGoals }) =>
        [awayTeamGoals, homeTeamGoals]);

      const { allStatus } = new GetLeaderboard(away);

      return {
        name: teamName,
        ...allStatus as Omit<ILeaderboard, 'name'>,
      };
    });

    sort(leaderboard);

    return leaderboard;
  }

  static async home() {
    const teams = await TeamService.getAllTeamsEager();

    const leaderboard = teams.map(({ teamName, matchesHome }: TeamWithMatches) => {
      const home = matchesHome.map(({ homeTeamGoals, awayTeamGoals }) =>
        [homeTeamGoals, awayTeamGoals]);

      const { allStatus } = new GetLeaderboard(home);

      return {
        name: teamName,
        ...allStatus as Omit<ILeaderboard, 'name'>,
      };
    });

    sort(leaderboard);

    return leaderboard;
  }
}
