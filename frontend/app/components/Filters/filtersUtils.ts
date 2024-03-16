export const formatSeason = (label: string) =>
  `${label.slice(0, 4)}-${label.slice(5)}`;

export const formatPerMode = (label: string) => {
  if (label === 'PerGame') return 'Per Game';
  if (label === 'Per48') return 'Per 48';
  return label;
};
