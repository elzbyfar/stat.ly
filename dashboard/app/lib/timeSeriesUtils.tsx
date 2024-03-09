import {
  BoxAnnotationProps,
  DatasetProps,
  LineAnnotationProps,
  ScalesProps,
  ZoomProps,
} from './types';
import { AnnotationElement } from 'chartjs-plugin-annotation/types/element';
import {
  AnnotationOptions,
  AnnotationPluginOptions,
} from 'chartjs-plugin-annotation';
import Chart from 'chart.js/auto';

export function getBoxAnnotation({
  backgroundColor,
  xMax,
  xMin,
  content,
  duration,
  display,
}: BoxAnnotationProps) {
  const highlightedColor =
    backgroundColor.substring(0, backgroundColor.length - 2) + '60';

  const rotation = duration < 4000000 ? 90 : 0;
  const bottom = duration < 4000000 ? 50 : 0;
  return {
    type: 'box',
    backgroundColor,
    borderWidth: 0,
    display,
    xMax,
    xMin,
    label: {
      display: true,
      enabled: true,
      color: '#000000',
      content: content,
      font: {
        size: 12,
        weight: 'bold',
      },
      position: {
        x: 'center',
        y: 'start',
      },
      rotation,
      padding: {
        top: 50,
        bottom,
      },
    },
    enter({ element }: { element: Chart }, _: any) {
      element.options.borderWidth = 1;
      element.options.backgroundColor = highlightedColor;
      return true;
    },
    leave({ element }: { element: Chart }, _: any) {
      element.options.borderWidth = 0;
      element.options.backgroundColor = backgroundColor;
      return true;
    },
  } as AnnotationPluginOptions & AnnotationElement;
}

export function getLineAnnotation({
  borderColor,
  dashed,
  content,
  value,
  unit,
  display,
}: LineAnnotationProps) {
  return {
    type: 'line',
    borderColor,
    borderDash: dashed ? [6, 6] : [],
    borderWidth: 2,
    display,
    label: {
      enabled: true,
      display: true,
      backgroundColor: '#fccd32',
      color: '#000000',
      zIndex: 100,
      font: { size: 12, weight: 400 },
      content: () => content + ' ' + value + ' ' + unit,
      position: 'end',
    },
    scaleID: 'y',
    value: () => value,
  } as AnnotationOptions & AnnotationElement;
}

export function getDataset({ label, mainField, readings }: DatasetProps) {
  const data = readings.map((r: { ts: number; [key: string]: number }) => ({
    x: r.ts,
    y: r[mainField as keyof typeof r],
  }));

  return {
    datasets: [
      {
        label,
        data,
        borderColor: '#b0839d',
        backgroundColor: '#e53f6550',
        tension: 0.2,
        borderWidth: 2,
        pointStyle: 'circle',
        pointRadius: 0.8,
        pointHoverRadius: 8,
      },
    ],
  };
}

export function getScales({ unit, min, max }: ScalesProps) {
  let xAxisUnit = 'hour';
  let stepSize = 1;
  if (max && min) {
    if (max - min < 7400000) {
      xAxisUnit = 'minute';
      stepSize = 5;
    }
    if (max - min < 1800000) {
      stepSize = 1;
    }
  }
  return {
    x: {
      min,
      max,
      type: 'time',
      ticks: {
        stepSize,
      },
      time: {
        unit: xAxisUnit,
      },
      title: {
        display: true,
        text: 'Time',
      },
    },
    y: {
      type: 'linear',
      title: {
        display: true,
        text: unit,
      },
    },
  };
}

export function getStdDev(
  readings: { ts: number; [key: string]: number }[],
  mean: number,
  field: string,
) {
  let stdDev = 0;
  for (const reading of readings) {
    stdDev += Math.pow(reading[field as keyof typeof reading] - mean, 2);
  }
  stdDev = Math.sqrt(stdDev / readings.length);
  return stdDev;
}

export function getZoom({ zoomRange, setZoomRange, readings }: ZoomProps) {
  const handleZoom = (event: Chart) => {
    const min = event.chart.options.scales.x.min;
    const max = event.chart.options.scales.x.max;
    if (min === zoomRange[0] && max === zoomRange[1]) return;
    setZoomRange([min, max]);
  };

  return {
    pan: {
      enabled: true,
      mode: 'x',
      speed: 0.5,
      threshold: 10,
      modifierKey: 'shift',
    },
    zoom: {
      speed: 0.05,
      wheel: {
        enabled: true,
        speed: 0.05,
      },
      drag: {
        enabled: true,
      },
      pinch: {
        enabled: true,
      },
      mode: 'x',
      onZoom: (event: Chart) => handleZoom(event),
    },
    limits: {
      x: { min: readings[0].ts, max: readings[readings.length - 1].ts },
    },
  };
}
