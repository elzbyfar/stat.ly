import { createContext } from 'react';
import { Player, SelectOption } from '@/app/lib/types';

type AppContextType = {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  searchResults: Player[];
  setSearchResults: (searchResults: Player[]) => void;
  selectedPlayers: SelectOption[];
  setSelectedPlayers: (selectedPlayers: SelectOption[]) => void;
};

const AppContext = createContext<AppContextType>({
  searchInput: '',
  setSearchInput: () => {},
  searchResults: [],
  setSearchResults: () => {},
  selectedPlayers: [],
  setSelectedPlayers: () => {},
});

export default AppContext;
