'use client';

import { useState, useContext } from 'react';
import { debounce, sortBy } from 'lodash';
import { Section } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Select, {
  components,
  OptionProps,
  CSSObjectWithLabel,
} from 'react-select';
import {
  Player,
  SelectOption,
  SelectOptionProps,
  CustomComponentsType,
} from '@/app/lib/types';
import { fetchGameLog, fetchPlayers } from '@/app/lib/api';
import AppContext from '@/app/context/AppContext';

export default function TypeAhead() {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<SelectOption | null>(null);

  const {
    searchInput,
    searchResults,
    playerPool,
    setGameLog,
    setSearchInput,
    setSearchResults,
    setPlayerPool,
  } = useContext(AppContext);

  const handleSearch = debounce(async (value: string) => {
    setLoading(true);
    const query = value.trim();

    if (!query) {
      setSearchInput('');
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setSearchInput(query);
    const players = await fetchPlayers(query);
    const sorted = sortBy(players, [
      (p: Player) => !p.is_active,
      (p: Player) => p.id,
    ]);
    setSearchResults(
      sorted.filter((p: Player) => !playerPool[p.id]).slice(0, 50),
    );
    setLoading(false);
  }, 200);

  const handleDisplayOption = (props: OptionProps) => {
    const { label } = props;
    const matchStart = label.toLowerCase().indexOf(searchInput.toLowerCase());
    const matchEnd = matchStart + searchInput.length;
    return (
      <components.Option {...props}>
        {label.substring(0, matchStart)}
        <strong className="font-bold">
          {label.substring(matchStart, matchEnd)}
        </strong>
        {label.substring(matchEnd)}
      </components.Option>
    );
  };

  const noOptionsMessage = () => {
    if (searchInput.length) {
      return 'No players found';
    }
    return 'Enter a player name';
  };

  const customComponents: CustomComponentsType = {
    IndicatorSeparator: () => null,
    Option: (props: SelectOptionProps) => handleDisplayOption(props),
    DropdownIndicator: () => (
      <MagnifyingGlassIcon className="absolute left-2" width="20" height="20" />
    ),
  };

  const customStyles = {
    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      cursor: 'text',
      marginLeft: '1.5rem',
    }),
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      borderRadius: '1.25rem',
    }),
  };

  const options = searchResults.map((player: Player) => ({
    ...player,
    label: player.full_name,
    value: String(player.id),
  }));

  const updatePlayerPool = (selection: SelectOption) => {
    const newSelection = {
      ...selection,
      order: Object.keys(playerPool).length + 1,
    };

    const updatedSelections = {
      ...playerPool,
      [selection.value]: newSelection,
    };

    setPlayerPool(updatedSelections);
  };

  const updateGameLog = async (selection: SelectOption) => {
    const year = new Date().getFullYear();

    const gameLog = await fetchGameLog({
      playerId: selection.value,
      seasonType: 'Regular Season',
      season: String(year - 1),
    });

    setGameLog(gameLog.resultSets[0]);
  };

  const handleChange = async (selection: SelectOption) => {
    if (!selection) return;
    updateGameLog(selection);
    updatePlayerPool(selection);
    setValue(null); // clear the input
  };

  return (
    <Section size="1" className="mx-auto my-4">
      <Select
        instanceId="player-search"
        options={options}
        styles={customStyles}
        components={customComponents}
        onInputChange={handleSearch}
        isLoading={loading}
        value={value}
        isSearchable
        placeholder="Search for NBA players"
        menuIsOpen={searchInput.length > 0}
        openMenuOnClick={false}
        noOptionsMessage={() => noOptionsMessage()}
        onChange={(selection) => handleChange(selection as SelectOption)}
      />
    </Section>
  );
}
