import useStyles from '@/app/hooks/useStyles';
import ActiveDataSelector from './ActiveDataSelector';
import DateSelector from './DateSelector';

export default function Filters() {
  const className = {
    wrapper: 'flex flex-col pt-6',
    label: 'p-1 text-xs text-zinc-400 font-semibold',
    spacer: 'pt-4',
  };

  const styles = useStyles(className);

  return (
    <div className={styles('wrapper')}>
      <label className={styles('label')}>Select a Category</label>
      <ActiveDataSelector />

      <label className={styles(['label', 'spacer'])}>Select a Date</label>
      <DateSelector />
    </div>
  );
}
