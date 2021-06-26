const Game = require("./GameFactory");
const Team = require("./TeamFactory");
const teams = require("../data/teams");
const { randomNumber } = require("../utils/randomizers");

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
    simulateSeason: function (show = false) {
      for (let i = 0; i < this._totalgames * Math.round(this.teams.length / 2); i++) {
        const { opp1, opp2 } = this.validOpponents();
        let game = Game(opp1, opp2);
        game.simulateGame(show);
        opp1.addOpponent(opp2);
        opp2.addOpponent(opp1);
        this.season["2022"].push(game);
      }
    },
    validOpponents: function () {
      let temp = this.teams
        .filter((team) => team.record.games < 82)
        .sort((a, b) =>
          a.record.games > b.record.games
            ? 1
            : a.record.games < b.record.games
            ? -1
            : 0
        );
      if (temp.length <= 2) {
        return { opp1: temp[0], opp2: temp[1] };
      }
      let team1 = randomNumber(0, Math.round(temp.length / 2));
      let team2 = randomNumber(0, Math.round(temp.length / 2));
      while (team1 == team2) {
        team2 = randomNumber(0, temp.length);
      }
      return { opp1: temp[team1], opp2: temp[team2] };
    },
    displayRankings: function () {
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
            } | ${team.weight}`
          );
        });
    },
  };
}

module.exports = NBA;
