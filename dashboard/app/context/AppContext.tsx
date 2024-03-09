import React from 'react';
import { StateMarker } from '../lib/types';

type AppContextType = {
  dataCategory: string;
  setDataCategory: (category: string) => void;
  readings: { ts: number; [key: string]: number }[];
  setReadings: (readings: { ts: number; [key: string]: number }[]) => void;
  stateMarkers: StateMarker[];
  setStateMarkers: (stateMarkers: StateMarker[]) => void;
  showAnnotations: { [key: string]: boolean };
  setShowAnnotations: (annotations: { [key: string]: boolean }) => void;
  operatingLoad: number;
  setOperatingLoad: (load: number) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  zoomRange: [number, number];
  setZoomRange: (range: [number, number]) => void;
  selectedRows: Set<string>;
  setSelectedRows: (rows: Set<string>) => void;
};

const AppContext = React.createContext<AppContextType>({
  dataCategory: 'powerMeasurements',
  setDataCategory: () => {},
  readings: [],
  setReadings: () => {},
  stateMarkers: [],
  setStateMarkers: () => {},
  showAnnotations: {},
  setShowAnnotations: () => {},
  operatingLoad: 0,
  setOperatingLoad: () => {},
  selectedDate: '2021-01-27',
  setSelectedDate: () => {},
  zoomRange: [0, 0],
  setZoomRange: () => {},
  selectedRows: new Set(),
  setSelectedRows: () => {},
});

export default AppContext;
