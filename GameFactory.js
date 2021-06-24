// Game Factory
function Game(home, away) {
  function randomNumber(min = 0, max = 3) {
    return Math.round(Math.random() * (max - min) + min);
  }
  return {
    _gameOver: false,
    _endScore: randomNumber(88, 127),
    winner: null,
    opponents: {
      home,
      away,
    },
    score: {
      home: 0,
      away: 0,
    },
    randomNumber,
    incrementScore: function (team, points) {
      this.score[team] += points;
    },
    displayScore: function () {
      console.log(`Home: ${this.score.home}, Away: ${this.score.away}`);
    },
    randomScorer: function () {
      let team = Math.round(Math.random());
      let points = this.randomNumber(1, 3);
      this.incrementScore(team ? "home" : "away", points);
    },
    simulateGame: function (show) {
      while (!this._gameOver) {
        this.randomScorer();
        if (
          this.score.home >= this._endScore ||
          this.score.away >= this._endScore
        ) {
          if (show) {
            this.displayScore();
            console.log(`The ${this.winner.team} win!`);
          }
          this._gameOver = true;
          this.winner =
            this.score.home > this.score.away
              ? this.opponents.home
              : this.opponents.away;
          if (this.winner.city == this.opponents.home.city) {
            this.opponents.home.updateRecord(true);
            this.opponents.away.updateRecord(false);
          } else {
            this.opponents.away.updateRecord(true);
            this.opponents.home.updateRecord(false);
          }
        }
      }
    },
  };
}

module.exports = Game;
