'use client';

import { useState, useContext, useEffect } from 'react';
import { RangeSlider } from 'rsuite';
import { getTooltip, findPointer } from './sliderUtils';
import AppContext from '@/app/context/AppContext';
import useStyles from '@/app/hooks/useStyles';
import 'rsuite/dist/rsuite.min.css';

export default function Slider() {
  const [tooltip, setTooltip] = useState<string>('');
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(100);
  const { readings, zoomRange, setZoomRange } = useContext(AppContext);

  useEffect(() => {
    const l = findPointer(zoomRange[0], 'left', readings);
    const r = findPointer(zoomRange[1], 'right', readings);
    setLeft(l);
    setRight(r);
    setTooltip(getTooltip(zoomRange[0], zoomRange[1]));
  }, [zoomRange]);

  const handleZoom = ([start, end]: number[]) => {
    const scope = readings.length - 1;
    const leftIndex = Math.floor((scope * start) / 100);
    const rightIndex = Math.ceil((scope * end) / 100);

    const leftTs = readings[leftIndex].ts;
    const rightTs = readings[rightIndex].ts;

    const range: [number, number] = [leftTs, rightTs];

    if (leftTs === zoomRange[0] && rightTs === zoomRange[1]) return;

    if (start === left) {
      range[0] = zoomRange[0];
    }
    if (end === right) {
      range[1] = zoomRange[1];
    }
    setTooltip(getTooltip(range[0], range[1]));
    setZoomRange(range);
  };

  const className = {
    wrapper: 'pt-2 w-full pr-4 text-right space-y-3 relative',
    zoomIn:
      'absolute text-[5rem] font-bold text-zinc-400/10 left-10 -bottom-[54px] select-none',
    label: 'text-xs text-zinc-400 font-semibold',
    tooltip: 'flex font-semibold rounded-lg w-32 text-center justify-center',
  };

  const styles = useStyles(className);

  return (
    <div className={styles('wrapper')}>
      <span className={styles('zoomIn')}>ZOOM IN</span>
      <label className={styles('label')}>
        Use the Slider for a closer look
      </label>
      <RangeSlider
        min={0}
        max={100}
        step={0.1}
        value={[left, right]}
        constraint={([start, end]: [number, number]) => end - start >= 0.2}
        renderTooltip={() => (
          <span className={styles('tooltip')}>{tooltip}</span>
        )}
        onChange={([start, end]: [number, number]) => handleZoom([start, end])}
      />
    </div>
  );
}
