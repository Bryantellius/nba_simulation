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
    updateRecord: function (win) {
      this.record.games++;
      this.record[win ? "wins" : "losses"]++;
    },
  };
}

module.exports = Team;
