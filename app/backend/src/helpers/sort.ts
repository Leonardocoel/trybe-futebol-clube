import ILeaderboard from '../interfaces/ILeaderboard';

const sort = (leaderboard: ILeaderboard[]) => leaderboard.sort((a, b) =>
  b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);

export default sort;
