import useStyles from '../hooks/useStyles';
import Description from '../components/Description';
import Filters from '../components/Filters';
import TimeSeriesChart from '../components/TimeSeriesChart';
import StateLogs from '../components/StateLogs';

export default function Power() {
  const className = {
    main: 'flex min-h-screen flex-col items-center py-24 gap-y-8 mx-auto',
    wrapper:
      'bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] w-[1200px]',
    descriptionFilters: 'flex items-center justify-between w-full px-12',
  };

  const styles = useStyles(className);
  return (
    <>
      <div className={styles('descriptionFilters')}>
        <Description />
        <Filters />
      </div>
      <TimeSeriesChart />
      <StateLogs />
    </>
  );
}
