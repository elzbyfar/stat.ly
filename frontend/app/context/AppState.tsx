'use client';

import { useState, ReactNode } from 'react';
import AppContext from './AppContext';
import { Player } from '@/app/lib/types';

function AppState({ children }: { children: ReactNode }) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [playerPool, setPlayerPool] = useState<{
    [key: number]: Player;
  }>({});
  const [gameLog, setGameLog] = useState<{ [key: string]: any }>({});

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppState;
