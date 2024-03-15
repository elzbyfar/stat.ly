import TypeAhead from './components/TypeAhead';
import { Container } from '@radix-ui/themes';
import PlayerPool from './components/PlayerPool';
import Filters from './components/Filters';
import TimeSeriesChart from './components/TimeSeriesChart';

export default function Home() {
  return (
    <Container size="1" px="4">
      <TypeAhead />
      <PlayerPool />
      <TimeSeriesChart />
      <Filters />
    </Container>
  );
}
