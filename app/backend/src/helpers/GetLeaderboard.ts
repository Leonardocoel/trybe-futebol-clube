export default class GetLeaderboard {
  private _totalPoints = 0;
  private _totalGames = 0;
  private _totalVictories = 0;
  private _totalDraws = 0;
  private _totalLosses = 0;
  private _goalsFavor = 0;
  private _goalsOwn = 0;
  private _goalsBalance = 0;
  private _efficiency = 0;

  constructor(
    private matches: number[][],
  ) {
  }

  private get totalGames(): number {
    this._totalGames += this.matches.length;

    return this._totalGames;
  }

  private get totalPoints(): number {
    this._totalPoints = this._totalVictories * 3 + this._totalDraws;

    return this._totalPoints;
  }

  private get totalVictories(): number {
    this.matches.forEach(([GP, GC]) => {
      if (GP > GC) this._totalVictories += 1;
    });

    return this._totalVictories;
  }

  private get totalDraws(): number {
    this.matches.forEach(([GP, GC]) => {
      if (GP === GC) this._totalDraws += 1;
    });

    return this._totalDraws;
  }

  private get totalLosses(): number {
    this.matches.forEach(([GP, GC]) => {
      if (GP < GC) this._totalLosses += 1;
    });

    return this._totalLosses;
  }

  private get goalsFavor(): number {
    this.matches.forEach(([GP]) => {
      this._goalsFavor += GP;
    });

    return this._goalsFavor;
  }

  private get goalsOwn(): number {
    this.matches.forEach(([,GC]) => {
      this._goalsOwn += GC;
    });

    return this._goalsOwn;
  }

  private get goalsBalance(): number {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;

    return this._goalsBalance;
  }

  private get efficiency(): number {
    this._efficiency = (this._totalPoints / (this._totalGames * 3)) * 100;

    return Number(this._efficiency.toFixed(2));
  }

  get allStatus(): object {
    return {
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      totalPoints: this.totalPoints,
      efficiency: this.efficiency,
    };
  }
}
