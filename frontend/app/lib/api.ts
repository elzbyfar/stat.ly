import getUrlWithQuery from '../utils/getUrlWithQuery';

export const config = {
  api: {
    bodyParser: false,
  }
}

const headers = {
  method: 'GET',
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function fetchPlayers(query: string) {
  try {
    const response = await fetch(
      getUrlWithQuery('/search-players', { query }),
      {
        headers,
      },
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
      getUrlWithQuery('/get-career', { player_id: playerId }),
      {
        headers,
      },
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
      getUrlWithQuery('/compare-players', { player_ids: playerIds.join(',') }),
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

export async function fetchGameLog(
  playerId: string,
  season: string = '',
  seasonType: string = '',
  dateTo?: string,
  dateFrom?: string,
) {
  try {
    const response = await fetch(
      getUrlWithQuery('/get-game-log', {
        player_id: playerId,
        season_type: seasonType,
        season,
        date_to: dateTo,
        date_from: dateFrom,
      }),
      {
        headers,
      },
    );

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
      getUrlWithQuery('/get-common-player-info', { player_id: playerId }),
      {
        headers,
      },
    );

    if (!response.ok) throw new Error("Failed to fetch player's common info");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Something went wrong while fetching player's common info", error);
  }
}
