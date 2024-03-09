'use client';

import { useState, ReactNode } from 'react';

import AppContext from './AppContext';
import { Reading, StateMarker } from '../lib/types';

function AppState({ children }: { children: ReactNode }) {
  type ShowAnnotations = { [key: string]: boolean };

  const [dataCategory, setDataCategory] = useState<string>('powerMeasurements');
  const [readings, setReadings] = useState<Reading[]>([]);
  const [stateMarkers, setStateMarkers] = useState<StateMarker[]>([]);
  const [showAnnotations, setShowAnnotations] = useState<ShowAnnotations>({});
  const [operatingLoad, setOperatingLoad] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>('2021-01-27');
  const [zoomRange, setZoomRange] = useState<[number, number]>([0, 0]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  return (
    <AppContext.Provider
      value={{
        dataCategory,
        setDataCategory,
        readings,
        setReadings,
        stateMarkers,
        setStateMarkers,
        showAnnotations,
        setShowAnnotations,
        operatingLoad,
        setOperatingLoad,
        selectedDate,
        setSelectedDate,
        zoomRange,
        setZoomRange,
        selectedRows,
        setSelectedRows,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppState;
