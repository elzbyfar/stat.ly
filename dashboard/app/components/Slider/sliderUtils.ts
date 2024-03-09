import { Reading } from '@/app/lib/types';
import { DateTime } from 'luxon';

export const getTooltip = (start: number, end: number) => {
  const startTime = DateTime.fromMillis(start).toFormat('hh:mm a');
  const endTime = DateTime.fromMillis(end).toFormat('hh:mm a');
  return `${startTime} - ${endTime}`;
};

export const findPointer = (ts: number, position: string, readings: Reading[]) => {
  if (position === 'left') {
    for (let i = 0; i < readings.length; i++) {
      if (readings[i].ts >= ts)
        return Math.floor((i / readings.length) * 100);
    }
  } else {
    for (let i = readings.length - 1; i >= 0; i--) {
      if (readings[i].ts <= ts) return Math.ceil((i / readings.length) * 100);
    }
  }
  return position === 'left' ? 0 : 100;
};