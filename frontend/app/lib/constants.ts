import { DateTime } from "luxon";

export const SEASON_TYPES: string[] = [
  "Regular Season",
  "Playoffs",
  "All Star",
  "Pre Season",
]

export const STAT_CATEGORIES: string[] = [
  "MIN", "FGM", "FGA", "FG_PCT", "FG3M", "FG3A", "FG3_PCT", "FTM", "FTA", "FT_PCT", "OREB", "DREB", "REB", "AST", "STL", "BLK", "TOV", "PF", "PTS", "EFF", "AST_TOV", "STL_TOV"
]

export const PER_MODES: string[] = [
  "Per Game", "Per 48", "Totals"
]

export const SEASONS: string[] = []

let currentYear = DateTime.now().year;

while (currentYear >= 1946) {
  SEASONS.push(`${currentYear - 1}-${currentYear.toString().slice(2)}`);
  currentYear -= 1;
}
