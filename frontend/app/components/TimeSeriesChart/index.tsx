'use client';
import React, {
  LegacyRef,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { DateTime } from 'luxon';
import type { ChartItem, ChartDataset } from 'chart.js';
import { ChartTypeRegistry } from 'chart.js';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import AppContext from '@/app/context/AppContext';
import 'chartjs-adapter-luxon';
import { ActiveDatasets, ChartCtxType } from '@/app/lib/types';
import { Section, Text } from '@radix-ui/themes';
import useStyles from '@/app/hooks/useStyles';
import useRandomColor from '@/app/hooks/useRandomColor';
import { fetchAllPlayers } from '@/app/lib/api';

Chart.register(annotationPlugin);

export default function TimeSeriesChart() {
  const [datasets, setDatasets] = React.useState<ActiveDatasets>({});
  const { playerPool, gameLog } = useContext(AppContext);

  const { color, generateColor } = useRandomColor();

  const chartInstance = useRef<Chart>(null);
  const chartRef = useRef<LegacyRef<HTMLCanvasElement> | undefined>(
    {} as LegacyRef<HTMLCanvasElement>,
  );

  const getLabel = useCallback((dateStr: string): number => {
    const date = DateTime.fromFormat(dateStr, 'MMM dd, yyyy');
    return date.toMillis();
  }, []);

  const getGames = useCallback(
    (log: string[]) => {
      type ChartData = { x: number; y: number };
      const gameData: ChartData[] = [];
      while (log.length) {
        const game = log.pop();
        if (!game?.length) continue;
        gameData.push({ x: getLabel(game[3]), y: Number(game[24]) });
      }
      return gameData;
    },
    [getLabel],
  );

  useEffect(() => {
    const waitForPlayers = async () => {
      const players = await fetchAllPlayers();
      console.log({ players });
    };
    waitForPlayers();
  }, []);

  useEffect(() => {
    if (!gameLog?.rowSet?.length) return;
    const player = playerPool[gameLog?.rowSet[0][1]];

    if (datasets[player.id]) return;

    generateColor();
    console.log({ color });
    const updatedDatasets = {
      ...datasets,
      [player.id]: {
        label: player.label,
        data: getGames([...(gameLog?.rowSet || [])]),
        borderColor: color,
        backgroundColor: `${color}50`,
        borderWidth: 1,
        pointRadius: 2,
        hoverRadius: 8,
        tension: 0.2,
      },
    };
    setDatasets(updatedDatasets);

    if (chartInstance.current) {
      if (chartInstance.current.options.scales?.y) {
        chartInstance.current.options.scales = {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                month: 'MMM',
              },
            },
          },
        };
      }

      chartInstance.current.data.datasets = Object.values(updatedDatasets);
      chartInstance.current.update();
    }
  }, [gameLog, getGames, playerPool, datasets, color, generateColor]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx: {
        chart: ChartCtxType;
        type: string;
      } = chartRef.current.getContext('2d');

      const initialChartConfig = {
        type: 'line',
        data: {
          datasets: [],
        },
        options: {
          plugins: {
            annotation: {
              annotations: {},
            },
          },
          scales: {
            x: {},
            y: {
              beginAtZero: true,
              max: 0,
              ticks: {
                display: false,
              },
            },
          },
        },
      };

      chartInstance.current = new Chart(
        ctx as keyof ChartItem,
        initialChartConfig,
      );
    }

    return () => {
      if (chartInstance.current) {
        (chartInstance.current as Chart).destroy();
      }
    };
  }, []);

  const className = {
    wrapper:
      'relative flex flex-col justify-center items-center w-full text-right py-8 pr-8 pl-4',
    label: 'text-xs text-zinc-400 font-semibold mr-4 mb-2',
    controls: 'flex gap-x-10 items-start',
  };

  const styles = useStyles(className);
  return (
    <Section size="1" className={styles('wrapper')}>
      <span
        data-hide={Boolean(gameLog?.rowSet?.length)}
        className="absolute z-10 text-[#efefef] text-4xl font-extrabold mb-20 data-[hide=true]:opacity-0 transition-all duration-300 ease-in-out"
      >
        NOTHING TO SEE HERE
      </span>
      <canvas ref={chartRef}></canvas>
      <label className={styles('label')}>
        Pinch, Drag or use your Mouse Wheel to Zoom In
      </label>
      <label className={styles('label')}>
        Hold Shift + Click and Drag to Pan
      </label>
      <div className={styles('controls')}>
        {/* TODO: checkboxes, toggles, other controls... */}
      </div>
    </Section>
  );
}
