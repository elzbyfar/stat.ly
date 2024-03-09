'use client';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { fetchMachineStates, fetchPowerReadings } from '@/app/lib/api';
import {
  getBoxAnnotation,
  getDataset,
  getLineAnnotation,
  getScales,
  getStdDev,
  getZoom,
} from '@/app/lib/timeSeriesUtils';
import { STATES, POWER_CATEGORIES } from '@/app/lib/constants';
import { Annotation } from '@/app/lib/types';
import AppContext from '@/app/context/AppContext';
import Slider from '../Slider';
import Chart from 'chart.js/auto';
import annotationPlugin, { AnnotationElement } from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-luxon';
import Checkboxes from '../Checkboxes';
import { StateMarker } from '@/app/lib/types';
import useStyles from '@/app/hooks/useStyles';

Chart.register(annotationPlugin, zoomPlugin);

export default function TimeSeriesChart() {
  const [minReading, setMinReading] = useState<number>(Infinity);
  const [maxReading, setMaxReading] = useState<number>(0);
  const [stdDeviation, setStdDeviation] = useState<number>(0);
  const [medianReading, setMedianReading] = useState<number>(0);

  const {
    selectedDate,
    dataCategory,
    operatingLoad,
    readings,
    stateMarkers,
    setReadings,
    setStateMarkers,
    setOperatingLoad,
    showAnnotations,
    zoomRange,
    setZoomRange,
    selectedRows,
  } = useContext(AppContext);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const keyMetricsData = [
    { label: 'Min/Max', value: minReading },
    { label: 'Min/Max', value: maxReading },
    { label: 'Median', value: medianReading },
    { label: 'Standard Deviation', value: stdDeviation },
    { label: 'Operating Load', value: operatingLoad },
  ];

  const category = POWER_CATEGORIES[dataCategory];

  const shouldDisplay = (marker: StateMarker) =>
    showAnnotations[marker.state as keyof typeof showAnnotations] === true ||
    selectedRows.has(marker.id);

  const boxAnnotations = stateMarkers.reduce((annotation, marker, idx) => {
    const key = `annotation${idx + 1}`;
    annotation[key] = getBoxAnnotation({
      backgroundColor: STATES[marker.state].color,
      xMax: marker.end,
      xMin: marker.start,
      content: marker.state,
      duration: marker.duration,
      display: shouldDisplay(marker),
    });
    return annotation;
  }, {} as Annotation);

  const lineAnnotations = keyMetricsData.reduce((annotation, metric, idx) => {
    const key = `${metric.label}Annotation${idx + 1}`;
    annotation[key] = getLineAnnotation({
      borderColor: '#3f3f46',
      dashed: true,
      content: metric.label,
      value: parseFloat(metric.value.toFixed(2)),
      unit: category.unit as string,
      display: showAnnotations[metric.label] ?? false,
    });
    return annotation;
  }, {} as Annotation);

  const annotations = {
    ...boxAnnotations,
    ...lineAnnotations,
  };

  useEffect(() => {
    const waitForMachineStates = async () => {
      const data = await fetchMachineStates({
        date: selectedDate,
      });

      setStateMarkers(data.states);
      setOperatingLoad(data.operatingLoad);
    };
    if (stateMarkers.length) return;
    waitForMachineStates();
  }, [selectedDate]);

  // useEffect(() => {
  //   const waitForReadings = async () => {
  //     const data = await fetchPowerReadings({
  //       keys: POWER_CATEGORIES[dataCategory].items,
  //       date: selectedDate,
  //     });

  //     const response = data.timestampsByCategory;
  //     setReadings(response);
  //     setZoomRange([response[0].ts, response[response.length - 1].ts]);
  //   };
  //   if (dataCategory === '') return;
  //   waitForReadings();
  // }, [dataCategory, selectedDate]);

  useEffect(() => {
    if (readings.length) {
      let min = Infinity;
      let max = 0;
      let mean = 0;
      const { key: mainField } = POWER_CATEGORIES[dataCategory];
      for (const reading of readings) {
        min = Math.min(min, reading[mainField as keyof typeof reading]);
        max = Math.max(max, reading[mainField as keyof typeof reading]);
        mean += reading[mainField as keyof typeof reading];
      }
      mean /= readings.length;
      setMinReading(min);
      setMaxReading(max);
      setMedianReading((min + max) / 2);
      const stdDev = getStdDev(readings, mean, mainField as string);
      setStdDeviation(stdDev);
    }
  }, [readings, dataCategory]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        (chartInstance.current as Chart).destroy();
      }

      const ctx = (chartRef.current as HTMLCanvasElement).getContext('2d');

      if (dataCategory === '' || !readings.length) return;

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        backgroundColor: '#ffffff',
        data: getDataset({
          label: category.title,
          mainField: category.key as string,
          readings: readings,
        }),
        options: {
          scales: getScales({
            unit: category.unit as string,
            min: zoomRange[0],
            max: zoomRange[1],
          }),
          plugins: {
            // annotation: { annotations },
            legend: { display: false },
            zoom: getZoom({ zoomRange, setZoomRange, readings }),
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        (chartInstance.current as Chart).destroy();
      }
    };
  }, [
    readings,
    selectedRows,
    dataCategory,
    showAnnotations,
    zoomRange,
    stateMarkers,
    operatingLoad,
    selectedDate,
    minReading,
    maxReading,
    medianReading,
    stdDeviation,
  ]);

  const className = {
    wrapper: 'flex flex-col w-full text-right py-8 pr-8 pl-4 rounded-md',
    label: 'text-xs text-zinc-400 font-semibold mr-4 mb-2',
    controls: 'flex gap-x-10 items-start',
  };

  const styles = useStyles(className);

  return (
    <div className={styles('wrapper')}>
      <label className={styles('label')}>
        Pinch, Drag or use your Mouse Wheel to Zoom In
      </label>
      <label className={styles('label')}>
        Hold Shift + Click and Drag to Pan Left / Right
      </label>
      <canvas ref={chartRef}></canvas>
      <div className={styles('controls')}>
        <Checkboxes />
        <Slider />
      </div>
    </div>
  );
}
