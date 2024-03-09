'use client';

import { useState, ReactNode } from 'react';
import AppContext from './AppContext';
import { Player, SelectOption } from '@/app/lib/types';

function AppState({ children }: { children: ReactNode }) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<SelectOption[]>([]);

  return (
    <AppContext.Provider
      value={{
        searchInput,
        setSearchInput,
        searchResults,
        setSearchResults,
        selectedPlayers,
        setSelectedPlayers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppState;
