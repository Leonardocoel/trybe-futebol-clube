export interface IMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchReturn extends IMatch {
  id: number;
  inProgress: boolean;
}
