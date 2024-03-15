import getUrlWithParams from '../utils/getUrlWithParams';
import { GameLogParams, LeagueLeaderParams } from './types';

export const config = {
  api: {
    bodyParser: false,
  },
};

const headers = {
  method: 'GET',
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function fetchPlayers(query: string) {
  try {
    const response = await fetch(
      getUrlWithParams('/search-players', { query }),
      { headers },
    );

    if (!response.ok) throw new Error('Failed to fetch players');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something went wrong while searching', error);
  }
}

export async function fetchCareer(playerId: string) {
  try {
    const response = await fetch(
      getUrlWithParams('/get-career', { player_id: playerId }),
      { headers },
    );

    if (!response.ok) throw new Error("Failed to fetch player's career");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Something went wrong while fetching player's career", error);
  }
}

export async function comparePlayers(playerIds: number[]) {
  try {
    const response = await fetch(
      getUrlWithParams('/compare-players', { player_ids: playerIds.join(',') }),
      {
        headers,
      },
    );

    if (!response.ok) throw new Error('Failed to compare players');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something went wrong while comparing players', error);
  }
}

export async function fetchGameLog(params: GameLogParams) {
  try {
    const response = await fetch(getUrlWithParams('/get-game-log', params), {
      headers,
    });

    if (!response.ok) throw new Error("Failed to fetch player's game log");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Something went wrong while fetching player's game log",
      error,
    );
  }
}

export async function fetchCommonPlayerInfo(playerId: string) {
  try {
    const response = await fetch(
      getUrlWithParams('/get-common-player-info', { player_id: playerId }),
      { headers },
    );

    if (!response.ok) throw new Error("Failed to fetch player's common info");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Something went wrong while fetching player's common info",
      error,
    );
  }
}

export async function fetchAllPlayers() {
  try {
    const response = await fetch(getUrlWithParams('/get-all-players'), {
      headers,
    });

    if (!response.ok) throw new Error('Failed to fetch all players');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something went wrong while fetching all players', error);
  }
}

export async function fetchLeagueLeaders(params: LeagueLeaderParams) {
  try {
    const response = await fetch(getUrlWithParams('/get-league-leaders', params), {
      headers,
    });

    if (!response.ok) throw new Error('Failed to fetch league leaders');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something went wrong while fetching league leaders', error);
  }
}
