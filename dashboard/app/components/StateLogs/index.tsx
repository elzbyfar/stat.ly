'use client';
import { useContext } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import AppContext from '@/app/context/AppContext';
import useStyles from '@/app/hooks/useStyles';

export default function Logs() {
  const { stateMarkers, showAnnotations } = useContext(AppContext);

  let filteredData = stateMarkers;
  if (
    !stateMarkers.every(
      ({ state }) =>
        showAnnotations[state] === undefined ||
        showAnnotations[state] === false,
    )
  ) {
    filteredData = stateMarkers.filter(
      ({ state }) => showAnnotations[state] === true,
    );
  }

  const className = {
    wrapper: 'container mx-auto pt-4 pb-10 bg-white',
    label: 'text-lg font-semibold mb-2 ml-2',
  };

  const styles = useStyles(className);

  return (
    <div className={styles('wrapper')}>
      <h3 className={styles('label')}>State Logs</h3>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
