const teams = [
  {
    city: "Brooklyn",
    team: "Nets",
  },
  {
    city: "Milwaukee",
    team: "Bucks",
  },
  {
    city: "LA",
    team: "Clippers",
  },
  {
    city: "LA",
    team: "Lakers",
  },
  {
    city: "Portland",
    team: "Trailblazers",
  },
  {
    city: "Denver",
    team: "Nuggets",
  },
  {
    city: "Sacramento",
    team: "Kings",
  },
  {
    city: "Golden State",
    team: "Warriors",
  },
  {
    city: "Phoenix",
    team: "Suns",
  },
  {
    city: "Miami",
    team: "Heat",
  },
  {
    city: "Orlando",
    team: "Magic",
  },
  {
    city: "New York",
    team: "Knicks",
  },
  {
    city: "Memphis",
    team: "Grizzlies",
  },
  {
    city: "Atlanta",
    team: "Hawks",
  },
  {
    city: "Toronto",
    team: "Raptors",
  },
  {
    city: "Boston",
    team: "Celtics",
  },
  {
    city: "Utah",
    team: "Jazz",
  },
  {
    city: "Houston",
    team: "Rockets",
  },
  {
    city: "Dallas",
    team: "Mavericks",
  },
  {
    city: "Charlotte",
    team: "Hornets",
  },
  {
    city: "San Antonio",
    team: "Spurs",
  },
  {
    city: "Washington",
    team: "Wizards",
  },
  {
    city: "Indiana",
    team: "Pacers",
  },
  {
    city: "Minnesota",
    team: "Timberwolves",
  },
  {
    city: "Oklahoma City",
    team: "Thunder",
  },
  {
    city: "Cleveland",
    team: "Cavaliers",
  },
  {
    city: "Detriot",
    team: "Pistons",
  },
  {
    city: "Chicago",
    team: "Bulls",
  },
  {
    city: "New Orleans",
    team: "Pelicans",
  },
  {
    city: "Philedelphia",
    team: "76ers",
  },
  {
    city: "Philedelphia",
    team: "76ers",
  },
];

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
            this.opponents.home.record.wins += 1;
          } else {
            this.opponents.home.record.losses += 1;
          }
        }
      }
    },
  };
}

// Team Factory
function Team(city, team) {
  return {
    city,
    team,
    record: {
      games: 0,
      wins: 0,
      losses: 0,
    },
  };
}

// NBA Factory
function NBA() {
  return {
    teams: [],
    addTeams: function () {
      teams.forEach(({ city, team }) => {
        this.teams.push(Team(city, team));
      });
    },
    _totalgames: 82,
    season: {
      2022: [],
    },
    simulateSeason: function (show = false) {
      for (let i = 0; i < this.teams.length * this._totalgames; i++) {
        let game = Game(...this.randomTeam());
        game.simulateGame(show);
        this.season["2022"].push(game);
      }
    },
    randomTeam: function (notTeam) {
      let team1 = this.teams[Math.floor(Math.random() * temp.length)];
      let temp = this.teams.filter((team) => team.city != notTeam.city);
      let team2 = temp[Math.floor(Math.random() * temp.length)];
      return team2;
    },
    displayRankings() {
      this.teams
        .sort((a, b) =>
          a.record.wins < b.record.wins
            ? 1
            : a.record.wins > b.record.wins
            ? -1
            : 0
        )
        .forEach((team, i, arr) => {
          console.log(
            `${i + 1} | ${team.city} ${team.team} | ${team.record.wins}-${
              team.record.losses
            }`
          );
        });
    },
  };
}

const nba = NBA();
nba.addTeams();

nba.simulateSeason();

nba.displayRankings();
