'use client';

import { useState, useContext, ReactElement } from 'react';
import { debounce, sortBy } from 'lodash';
import Select, {
  components,
  CSSObjectWithLabel,
  MultiValue,
  OptionProps,
} from 'react-select';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Player, SelectOption } from '@/app/lib/types';
import { fetchPlayers } from '@/app/lib/api';
import AppContext from '@/app/context/AppContext';

export default function TypeAhead() {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<SelectOption | null>(null);

  const {
    searchInput,
    searchResults,
    selectedPlayers,
    setSearchInput,
    setSearchResults,
    setSelectedPlayers,
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
      (player: Player) => !player.is_active,
      (player: Player) => player.id,
    ]);
    setSearchResults(sorted.slice(0, 50));
    setLoading(false);
  }, 200);

  const handleDisplayOption = (props: OptionProps): ReactElement => {
    const { label } = props;
    const matchStart = label.toLowerCase().indexOf(searchInput.toLowerCase());
    const matchEnd = matchStart + searchInput.length;
    return (
      <components.Option {...props}>
        {label.substring(0, matchStart)}
        <span className="font-bold">
          {label.substring(matchStart, matchEnd)}
        </span>
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

  const customComponents = {
    // DropdownIndicator: () => null,
    DropdownIndicator: () => (
      <MagnifyingGlassIcon className="absolute left-2" width="20" height="20" />
    ),
    IndicatorSeparator: () => null,
    Option: (props: OptionProps) => handleDisplayOption(props),
  };

  const customStyles = {
    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      cursor: 'text',
      marginLeft: '1.5rem',
    }),
  };

  const options = searchResults.map((player: Player) => ({
    label: player.full_name,
    value: String(player.id),
  }));

  return (
    <Select
      options={options}
      styles={customStyles}
      components={customComponents}
      onInputChange={handleSearch}
      isLoading={loading}
      value={value}
      isClearable
      isSearchable
      placeholder="Search for NBA players"
      menuIsOpen={searchInput.length > 0}
      openMenuOnClick={false}
      noOptionsMessage={() => noOptionsMessage()}
      onChange={(selection: unknown) => {
        const updatedSelections = [...selectedPlayers, selection];
        setSelectedPlayers(updatedSelections as SelectOption[]);
        setValue(null);
      }}
    />
  );
}
