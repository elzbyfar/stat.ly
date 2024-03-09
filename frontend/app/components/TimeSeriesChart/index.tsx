'use client';
import Image from 'next/image';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';
import type {
  ChartTypeRegistry,
  Point,
  BubbleDataPoint,
  ChartItem,
  ChartArea,
} from 'chart.js';
import { comparePlayers, fetchCareer, fetchGameLog } from '@/app/lib/api';
import AppContext from '@/app/context/AppContext';

import useStyles from '@/app/hooks/useStyles';
import { Section, Text, Container } from '@radix-ui/themes';
export default function TimeSeriesChart() {
  const { selectedPlayers } = useContext(AppContext);
  const chartRef = useRef<Chart>({} as Chart);
  const chartInstance = useRef<Chart>(null);

  const [career, setCareer] = useState<unknown[]>([]);
  const [gameLog, setGameLog] = useState({} as { [key: string]: any });
  const [comparison, setComparison] = useState([]);
  const [playerImages, setPlayerImages] = useState([] as string[]);

  useEffect(() => {
    const MONTH_NAMES = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const getLabel = (dateStr: string) => {
      const date = DateTime.fromFormat(dateStr, 'MMM dd, yyyy');
      return date.toMillis();
    };

    const getGame = (log: string[]) => {
      const output: { x: string; y: string }[] = [];
      while (log.length) {
        const game = log.pop();
        if (!game?.length) continue;
        output.push({ y: game[24], x: getLabel(game[3]) });
      }
      return output;
    };

    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx: {
        chart: Chart<
          keyof ChartTypeRegistry,
          (number | [number, number] | Point | BubbleDataPoint | null)[],
          unknown
        >;
        type: string;
      } = chartRef.current.getContext('2d');

      if (!selectedPlayers.length) return;

      chartInstance.current = new Chart(ctx as keyof ChartItem, {
        type: 'line',
        data: {
          // labels:
          //   gameLog?.rowSet?.map(
          //     (game: unknown[]) =>
          //       MONTH_NAMES[
          //         DateTime.fromFormat(game[3], 'MMM dd, yyyy').month - 1
          //       ],
          //   ) || [],
          // labels: getLabels(gameLog?.rowSet || []),
          datasets: [
            {
              label: 'Points',
              data: getGame([...(gameLog?.rowSet || [])]),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
            },
          ],
        },

        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMM',
                  year: 'YYYY',
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        (chartInstance.current as Chart).destroy();
      }
    };
  }, [gameLog, selectedPlayers]);

  useEffect(() => {
    const year = new Date().getFullYear();

    const waitForGameLog = async (
      playerId: string,
      season: string = String(year - 1),
      seasonType: string = 'Regular Season',
      dateTo?: string,
      dateFrom?: string,
    ) => {
      const response = await fetchGameLog(
        playerId,
        season,
        seasonType,
        dateTo,
        dateFrom,
      );
      setGameLog(response.resultSets[0]);
    };
    let playerId;
    const latestSelection = selectedPlayers.at(-1);
    if (latestSelection) {
      playerId = latestSelection.value;
    }
    if (playerId) {
      waitForGameLog(playerId);
    }
  }, [selectedPlayers]);

  // useEffect(() => {
  //   const waitForCompare = async () => {
  //     const playerIds: number[] = selectedPlayers.map((player) =>
  //       Number(player.value),
  //     );
  //     const comp = await comparePlayers(playerIds);
  //     setComparison(comp);
  //   };
  //   if (selectedPlayers.length > 1) {
  //     waitForCompare();
  //   }
  // }, [selectedPlayers]);

  // useEffect(() => {
  //   const year = new Date().getFullYear();
  //   const waitForGameLog = async (
  //     playerId: string,
  //     season: string = String(year - 1),
  //     seasonType: string = 'Regular Season',
  //     dateTo?: string,
  //     dateFrom?: string,
  //   ) => {
  //     const response = await fetchGameLog(playerId, season, seasonType);
  //     setGameLog(response.resultSets[0]);
  //   };
  //   let playerId;
  //   const latestSelection = selectedPlayers.at(-1);
  //   if (latestSelection) {
  //     playerId = latestSelection.value;
  //   }
  //   if (playerId) {
  //     waitForGameLog(playerId);
  //   }
  // }, [selectedPlayers]);

  const className = {
    wrapper: 'flex flex-col w-full text-right py-8 pr-8 pl-4 rounded-md',
    label: 'text-xs text-zinc-400 font-semibold mr-4 mb-2',
    controls: 'flex gap-x-10 items-start',
  };

  const styles = useStyles(className);
  return (
    <div className={styles('wrapper')}>
      <Section size="1" className="flex justify-center mx-auto">
        {selectedPlayers.map((player, idx) => {
          return (
            <div
              key={player.value}
              className="relative group flex pb-20 flex-col w-[3.25rem] items-center justify-center hover:gap-y-1 cursor-pointer transition-all duration-50 ease-out hover:z-10 hover:-mt-4"
            >
              <div className="absolute h-[80px] w-[80px] group-hover:w-[100px] bg-white shadow-[4px_4px_10px_#b0b0b0] group-hover:shadow-[0px_0px_5px_#b0b0b0] group-hover:h-[100px] group-hover:rounded-[60%] group-hover:bg-zinc-300 border-[1px] border-[#e0e0e0] group-hover:border-none flex justify-center overflow-hidden rounded-[100%] transition-all duration-50 ease-in-out">
                <Image
                  src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.value}.png`}
                  alt="player"
                  width={100}
                  height={100}
                  key={player.value}
                  className="grayscale-[60%] h-[105px] w-[105px] group-hover:w-[100px] group-hover:h-[100px] group-hover:rounded-none contrast-[0.80] group-hover:grayscale-0 object-cover group-hover:contrast-[none] transition-all duration-150 ease-in rounded-full "
                />
              </div>
              <div className="absolute bottom-0 text-[0px] flex flex-col group-hover:text-xs opacity-0 w-40 h-max group-hover:opacity-100 transition-all ease-in-out duration-300 text-center text-zinc-800 shadow-[2px_2px_10px_#b0b0b0] group-hover:text-orange-500 font-bold text-nowrap group-hover:z-20 bg-zinc-100 px-4 py-1 rounded-lg">
                <Text
                  key={player.value}
                  size="1"
                  // className="absolute bottom-0 text-[0px] group-hover:text-xs opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 text-center text-zinc-800 shadow-[2px_2px_10px_#b0b0b0] group-hover:text-orange-500 font-bold text-nowrap group-hover:z-20 bg-zinc-100 px-4 py-1 rounded-lg"
                >
                  {player.label}
                </Text>
                <Text
                  key={player.value}
                  size="1"
                  // className="absolute bottom-0 text-[0px] group-hover:text-xs opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 text-center text-zinc-800 shadow-[2px_2px_10px_#b0b0b0] group-hover:text-orange-500 font-bold text-nowrap group-hover:z-20 bg-zinc-100 px-4 py-1 rounded-lg"
                >
                  {player.value}
                </Text>
              </div>
            </div>
          );
        })}
      </Section>
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
    </div>
  );
}
