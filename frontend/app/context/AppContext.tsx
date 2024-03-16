import { createContext } from 'react';
import {
  PerMode48,
  Player,
  SeasonTypeAllStar,
  SelectOption,
  StatCategory,
} from '@/app/lib/types';

type AppContextType = {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  searchResults: Player[];
  setSearchResults: (searchResults: Player[]) => void;
  playerPool: { [key: number]: Player };
  setPlayerPool: (playerPool: { [key: number]: Player }) => void;
  gameLog: { [key: string]: any };
  setGameLog: (gameLog: { [key: string]: any }) => void;
  leagueLeaders: { [key: string]: string[] };
  setLeagueLeaders: (leagueLeaders: { [key: string]: string[] }) => void;
  season: string;
  setSeason: (season: string) => void;
  seasonType: SeasonTypeAllStar;
  setSeasonType: (seasonType: SeasonTypeAllStar) => void;
  statCategory: StatCategory;
  setStatCategory: (statCategory: StatCategory) => void;
  perMode: PerMode48;
  setPerMode: (perMode: PerMode48) => void;
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
  leagueLeaders: {},
  setLeagueLeaders: () => {},
  season: '',
  setSeason: () => {},
  seasonType: 'Regular Season',
  setSeasonType: () => {},
  statCategory: 'PTS',
  setStatCategory: () => {},
  perMode: 'PerGame',
  setPerMode: () => {},
});

export default AppContext;
