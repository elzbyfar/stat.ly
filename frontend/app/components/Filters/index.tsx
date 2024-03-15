'use client';

import { useEffect } from 'react';
import { Grid } from '@radix-ui/themes';
import CustomSelect from '../CustomSelect';
import {
  SEASONS,
  SEASON_TYPES,
  STAT_CATEGORIES,
  PER_MODES,
} from '../../lib/constants';
import useSelectOptions from '../../hooks/useSelectOptions';
import { fetchLeagueLeaders } from '@/app/lib/api';

export default function Filters() {
  const formatSeason = (label: string) =>
    `${label.slice(0, 4)}-${label.slice(5)}`;

  const formatPerMode = (label: string) => {
    if (label === 'PerGame') return 'Per Game';
    if (label === 'Per48') return 'Per 48';
    return label;
  };

  const {
    options: seasonOptions,
    defaultValue: defaultSeason,
    state: [season, setSeason],
  } = useSelectOptions(SEASONS, formatSeason);

  const {
    options: seasonTypeOptions,
    defaultValue: defaultSeasonType,
    state: [seasonType, setSeasonType],
  } = useSelectOptions(SEASON_TYPES);

  const {
    options: statCategoryOptions,
    defaultValue: defaultStatCategory,
    state: [statCategory, setStatCategory],
  } = useSelectOptions(STAT_CATEGORIES);

  const {
    options: perModeOptions,
    defaultValue: defaultPerMode,
    state: [perMode, setPerMode],
  } = useSelectOptions(PER_MODES, formatPerMode);

  useEffect(() => {
    const waitForLeagueLeaders = async () => {
      const data = await fetchLeagueLeaders({
        season: '2022-23',
        seasonTypeAllStar: 'Regular Season',
        statCategoryAbbreviation: 'PTS',
        perMode48: 'PerGame',
      });
    };
    waitForLeagueLeaders();
  }, []);

  return (
    <Grid columns="4" gap="4" width="auto">
      <CustomSelect
        label="Season"
        options={seasonOptions}
        defaultValue={defaultSeason}
        value={season}
        onChange={setSeason}
      />
      <CustomSelect
        label="Season Type"
        options={seasonTypeOptions}
        defaultValue={defaultSeasonType}
        value={seasonType}
        onChange={setSeasonType}
      />
      <CustomSelect
        label="Statistical Category"
        options={statCategoryOptions}
        defaultValue={defaultStatCategory}
        value={statCategory}
        onChange={setStatCategory}
      />
      <CustomSelect
        label="Mode"
        options={perModeOptions}
        defaultValue={defaultPerMode}
        value={perMode}
        onChange={setPerMode}
      />
    </Grid>
  );
}
