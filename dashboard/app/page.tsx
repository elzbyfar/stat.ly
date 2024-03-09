import Header from './components/Header';
import Filters from './components/Filters';
import TimeSeriesChart from './components/TimeSeriesChart';
import Description from './components/Description';
import StateLogs from './components/StateLogs';
import useStyles from './hooks/useStyles';
import Search from './components/Search';
import Power from './power/page';

export default function Home() {
  const className = {
    main: 'flex min-h-screen flex-col items-center py-24 gap-y-8 mx-auto',
  };
  const styles = useStyles(className);

  return (
    <main className={styles('main')}>
      <Search />
    </main>
  );
}
