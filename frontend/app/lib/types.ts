import Chart from 'chart.js/auto';
import Select, { GroupBase, OptionProps } from 'react-select';
import type {
  ChartTypeRegistry,
  ChartDataset,
  Point,
  BubbleDataPoint,
} from 'chart.js';

export type Player = {
  first_name: string;
  last_name: string;
  full_name: string;
  id: number;
  is_active: boolean;
  order: number;
  value?: string;
  label?: string;
};
export type SelectOption = {
  label: string;
  value: string;
};

export type ChartCtxType = Chart<
  keyof ChartTypeRegistry,
  (number | [number, number] | Point | BubbleDataPoint | null)[],
  unknown
>;

export type GameLogParams = {
  playerId: string;
  season: string;
  seasonTypeAllStar: 'Regular Season' | 'Playoffs' | 'Pre Season' | 'All Star';
  dateToNullable?: string;
  dateFromNullable?: string;
};

export type CustomComponentsType = Partial<
  typeof Select<SelectOption, boolean, GroupBase<SelectOption>>
>;

export type ActiveDatasets = {
  [key: number]: ChartDataset<
    keyof ChartTypeRegistry,
    (number | [number, number] | Point | BubbleDataPoint | null)[]
  >;
};

export type SelectOptionProps = OptionProps<
  unknown,
  boolean,
  GroupBase<unknown>
>;
