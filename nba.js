const NBA = require("./NBAFactory")

const nba = NBA();
nba.addTeams();

nba.simulateSeason();

nba.displayRankings();
