const NBA = require("./models/NBAFactory")

// Create an instance of NBA
const nba = NBA();

// Add the nba teams
nba.addTeams();

// Simulate games per team x opponent
nba.simulateSeason();

// Display the season end rankings
nba.displayRankings();
