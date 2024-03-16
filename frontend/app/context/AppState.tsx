'use client';

import { useState, ReactNode } from 'react';
import AppContext from './AppContext';
import {
  PerMode48,
  Player,
  SeasonTypeAllStar,
  StatCategory,
} from '@/app/lib/types';

function AppState({ children }: { children: ReactNode }) {
  // TODO: Add types
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [playerPool, setPlayerPool] = useState<{
    [key: number]: Player;
  }>({});
  const [leagueLeaders, setLeagueLeaders] = useState<{
    [key: string]: string[];
  }>({});
  const [gameLog, setGameLog] = useState<{ [key: string]: any }>({});
  const [season, setSeason] = useState<string>('2023-24');
  const [seasonType, setSeasonType] =
    useState<SeasonTypeAllStar>('Regular Season');
  const [statCategory, setStatCategory] = useState<StatCategory>('PTS');
  const [perMode, setPerMode] = useState<PerMode48>('PerGame');

  return (
    <AppContext.Provider
      value={{
        searchInput,
        setSearchInput,
        searchResults,
        setSearchResults,
        playerPool,
        setPlayerPool,
        gameLog,
        setGameLog,
        leagueLeaders,
        setLeagueLeaders,
        season,
        setSeason,
        seasonType,
        setSeasonType,
        statCategory,
        setStatCategory,
        perMode,
        setPerMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppState;
