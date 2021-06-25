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
    updateRecord: function (win) {
      this.record.games++;
      this.record[win ? "wins" : "losses"]++;
    },
    defineOpponents: function (teams) {
      // 4 x 4 division opponents (16)
      // 6 x 4 conference opponents (24)
      // 4 x 3 conference opponents (12)
      // 15 x 2 outter conference opponents (30)
      // 4 x 1 outter conference opponents (4)
      while (this.opponents.length < 82) {
        let sortedTeams = teams.sort((a, b) =>
          a.opponents.length < b.opponents.length
            ? 1
            : a.opponents.length > b.opponents.length
            ? -1
            : 0
        );
        let selectedTeam = sortedTeams.filter(
          (team) => team.opponents.length < 82
        )[0];
        this.opponents.push(selectedTeam);
      }
    },
  };
}

module.exports = Team;
