const Game = require("./GameFactory");
const Team = require("./TeamFactory");
const teams = require("./teams");

// NBA Factory
function NBA() {
  return {
    teams: [],
    addTeams: function () {
      teams.forEach(({ city, team, conference, division }) => {
        this.teams.push(Team(city, team, conference, division));
      });
    },
    _totalgames: 82,
    season: {
      2022: [],
    },
    generateOpponents() {
      this.teams.forEach((team, idx, arr) => team.defineOpponents(arr));
    },
    simulateSeason: function (show = false) {
      this.teams.forEach((team) => {
        team.opponents.forEach((opp) => {
          let game = Game(team, opp);
          game.simulateGame(show);
          this.season["2022"].push(game);
        });
      });
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
