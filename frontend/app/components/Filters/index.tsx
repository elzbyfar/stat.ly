'use client';

import { useEffect, useContext } from 'react';
import { Grid, RadioGroup, Flex, Text } from '@radix-ui/themes';
import CustomSelect from './CustomSelect';
import {
  SEASONS,
  SEASON_TYPES,
  STAT_CATEGORIES,
  PER_MODES,
} from '../../lib/constants';
import { useSelectOptions } from '../../hooks';
import { formatSeason, formatPerMode } from './filtersUtils';
import { fetchLeagueLeaders } from '@/app/lib/api';
import { PerMode48, SeasonTypeAllStar, StatCategory } from '@/app/lib/types';
import AppContext from '@/app/context/AppContext';
import CustomRadioGroup from './CustomRadioGroup';

export default function Filters() {
  const { seasonType, setSeasonType, perMode, setPerMode } =
    useContext(AppContext);
  const {
    options: seasonOptions,
    defaultValue: defaultSeason,
    state: [season, setSeason],
  } = useSelectOptions(SEASONS, formatSeason);

  const {
    options: statCategoryOptions,
    defaultValue: defaultStatCategory,
    state: [statCategory, setStatCategory],
  } = useSelectOptions(STAT_CATEGORIES);

  const { setLeagueLeaders } = useContext(AppContext);

  useEffect(() => {
    const waitForLeagueLeaders = async () => {
      const params = {
        season: season.value,
        perMode48: perMode,
        seasonTypeAllStar: seasonType,
        statCategoryAbbreviation: statCategory.value as StatCategory,
      };
      const response = await fetchLeagueLeaders(params);
      setLeagueLeaders(response.resultSet);
    };
    waitForLeagueLeaders();
  }, [season, seasonType, statCategory, perMode, setLeagueLeaders]);

  const dropdownData = [
    {
      label: 'Season',
      options: seasonOptions,
      defaultValue: defaultSeason,
      value: season,
      onChange: setSeason,
    },
    {
      label: 'Statistical Category',
      options: statCategoryOptions,
      defaultValue: defaultStatCategory,
      value: statCategory,
      onChange: setStatCategory,
    },
  ];
  const radioData = [
    {
      label: 'Season Type',
      options: SEASON_TYPES,
      defaultValue: 'Regular Season',
      value: seasonType,
      onChange: setSeasonType as (value: string) => void,
    },
    {
      label: 'Mode',
      options: PER_MODES,
      defaultValue: 'PerGame',
      value: perMode,
      onChange: setPerMode as (value: string) => void,
    },
  ];

  return (
    <Grid columns="4" gap="4" width="auto">
      {dropdownData.map((data) => (
        <CustomSelect {...data} key={data.label} />
      ))}
      {radioData.map((data) => (
        <CustomRadioGroup {...data} key={data.defaultValue} />
      ))}
    </Grid>
  );
}
