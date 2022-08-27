export interface IScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends IScore {
  homeTeam: number;
  awayTeam: number;

}

export interface IMatchReturn extends IMatch {
  id: number;
  inProgress: boolean;
}
