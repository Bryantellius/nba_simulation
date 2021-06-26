// Team Factory
function Team(city, team, conference, division, weight = 1) {
  return {
    city,
    team,
    conference,
    division,
    opponents: [],
    record: {
      games: 0,
      wins: 0,
      losses: 0,
    },
    weight,
    updateRecord: function (win, diff) {
      this.record.games++;
      this.record[win ? "wins" : "losses"]++;
    },
    addOpponent(team) {
      this.opponents.push(team);
    },
  };
}

module.exports = Team;
