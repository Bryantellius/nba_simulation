const NBA = require("./NBAFactory")

// Create an instance of NBA
const nba = NBA();

// Add the nba teams
nba.addTeams();

// Generate opponents for each team
nba.generateOpponents();

// Simulate games per team x opponent
nba.simulateSeason();

// Display the season end rankings
nba.displayRankings();
