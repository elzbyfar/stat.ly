import { createContext } from 'react';
import { Player, SelectOption } from '@/app/lib/types';

type AppContextType = {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  searchResults: Player[];
  setSearchResults: (searchResults: Player[]) => void;
  playerPool: { [key: number]: Player };
  setPlayerPool: (playerPool: { [key: number]: Player }) => void;
  gameLog: { [key: string]: any };
  setGameLog: (gameLog: { [key: string]: any }) => void;
};

const AppContext = createContext<AppContextType>({
  searchInput: '',
  setSearchInput: () => {},
  searchResults: [],
  setSearchResults: () => {},
  playerPool: {},
  setPlayerPool: () => {},
  gameLog: {},
  setGameLog: () => {},
});

export default AppContext;
