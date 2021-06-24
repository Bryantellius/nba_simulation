const Game = require("./GameFactory");
const Team = require("./TeamFactory");
const teams = require("./teams");

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
    randomTeam: function () {
      let possibleTeams = this.teams.filter((t) => t.record.games < 82);
      let team1 = possibleTeams[Math.floor(Math.random() * possibleTeams.length)];
      let temp = possibleTeams.filter((team) => team.city != team1.city);
      let team2 = temp[Math.floor(Math.random() * temp.length)];
      return [team1, team2];
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
            } | ${team.record.games}`
          );
        });
    },
  };
}

module.exports = NBA;
