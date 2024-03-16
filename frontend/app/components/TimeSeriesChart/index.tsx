'use client';
import React, {
  LegacyRef,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { DateTime } from 'luxon';
import { Section, Text } from '@radix-ui/themes';
import { ChartTypeRegistry } from 'chart.js';
import type {
  ChartItem,
  ChartDataset,
  Point,
  ChartDatasetProperties,
  tickValue,
} from 'chart.js';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

import AppContext from '@/app/context/AppContext';
import { useRandomColor, useStyles } from '@/app/hooks';
import { ActiveDatasets, ChartCtxType } from '@/app/lib/types';
import { fetchAllPlayers } from '@/app/lib/api';
import 'chartjs-adapter-luxon';

Chart.register(annotationPlugin);

export default function TimeSeriesChart() {
  const [datasets, setDatasets] = React.useState<ActiveDatasets>({});
  const { playerPool, gameLog, leagueLeaders } = useContext(AppContext);

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
    };
    waitForPlayers();
  }, []);

  useEffect(() => {
    if (!leagueLeaders?.rowSet?.length) return;

    const updatedDatasets = {};
    setDatasets(updatedDatasets);

    if (chartInstance.current) {
      if (chartInstance.current.options.scales?.y) {
        chartInstance.current.options.scales = {
          y: {
            ticks: {
              callback: (value: tickValue) => {
                return (value * 100).toFixed(0);
              },
            },
            title: {
              display: true,
              text: 'FGP (Field Goal Percentage)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'PPG (Points Per Game)',
              color: '#2341fe',
            },
          },
        };
      }

      if (chartInstance.current.options.plugins) {
        chartInstance.current.options.plugins.tooltip = {
          enabled: false,
          position: 'nearest',
          external: (context) => {
            const { chart, tooltip } = context;

            // const playerName = leagueLeaders.rowSet[context.dataIndex][2];
            console.log(context.tooltip);
            const title = context.tooltip.footer;

            let tooltipEl = chart.canvas.parentNode.querySelector('div');

            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
              tooltipEl.style.borderRadius = '3px';
              tooltipEl.style.color = 'white';
              tooltipEl.style.opacity = 1;
              tooltipEl.style.pointerEvents = 'none';
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.transform = 'translate(-50%, 0)';
              tooltipEl.style.transition = 'all .3s ease';
              const table = document.createElement('table');
              table.style.margin = '0px';

              tooltipEl.appendChild(table);
              chart.canvas.parentNode.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltip.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }
            // Set Text
            if (tooltip.body) {
              const titleLines = [title];
              const bodyLines = tooltip.body.map((b) => b.lines);

              const tableHead = document.createElement('thead');

              titleLines.forEach((title) => {
                const tr = document.createElement('tr');
                tr.style.borderWidth = 0;

                const th = document.createElement('th');
                th.style.borderWidth = 0;
                const text = document.createTextNode(title);
                th.appendChild(text);
                tr.appendChild(th);
                tableHead.appendChild(tr);
              });

              const tableBody = document.createElement('tbody');
              bodyLines.forEach((body, i) => {
                const colors = tooltip.labelColors[i];

                const span = document.createElement('span');
                span.style.background = colors.backgroundColor;
                span.style.borderColor = colors.borderColor;
                span.style.borderWidth = '2px';
                span.style.marginRight = '10px';
                span.style.height = '10px';
                span.style.width = '10px';
                span.style.display = 'inline-block';

                const tr = document.createElement('tr');
                tr.style.backgroundColor = 'inherit';
                tr.style.borderWidth = 0;

                const td = document.createElement('td');
                td.style.borderWidth = 0;

                const text = document.createTextNode(body);

                td.appendChild(span);
                td.appendChild(text);
                tr.appendChild(td);
                tableBody.appendChild(tr);
              });

              const tableRoot = tooltipEl.querySelector('table');

              // Remove old children
              while (tableRoot.firstChild) {
                tableRoot.firstChild.remove();
              }

              // Add new children
              tableRoot.appendChild(tableHead);
              tableRoot.appendChild(tableBody);
            }
            const { offsetLeft: positionX, offsetTop: positionY } =
              chart.canvas;

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
            tooltipEl.style.top = positionY + tooltip.caretY + 'px';
            tooltipEl.style.font = tooltip.options.bodyFont.string;
            tooltipEl.style.padding =
              tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
          },
          callbacks: {
            label: (context: { dataset: { data: Point[] }[] }) => {
              // console.log(leagueLeaders.rowSet[context.dataIndex]);
              const playerName = leagueLeaders.rowSet[context.dataIndex][2];
              const data = context.dataset.data[context.dataIndex];
              return `${data.x} PPG: ${(data.y * 100).toFixed(2)} FGP`;
            },
            footer: (context: { dataset: { data: Point[] }[] }) => {
              const playerName = leagueLeaders.rowSet[context[0].dataIndex][2];
              return playerName;
            },
          },
        };
      }

      chartInstance.current.data.datasets = [
        {
          label: 'Points Per Game',
          data: leagueLeaders.rowSet.map((player: string | number[]) => ({
            x: Number(player[23]),
            y: Number(player[9]),
          })),
          borderColor: '#000',
          radius: 5,
          hoverRadius: 8,
        },
      ];
      chartInstance.current.update();
    }
  }, [leagueLeaders]);

  // useEffect(() => {
  //   if (!gameLog?.rowSet?.length) return;
  //   const player = playerPool[gameLog?.rowSet[0][1]];

  //   if (datasets[player.id]) return;

  //   generateColor();
  //   const updatedDatasets = {
  //     ...datasets,
  //     [player.id]: {
  //       label: player.label,
  //       data: getGames([...(gameLog?.rowSet || [])]),
  //       borderColor: color,
  //       backgroundColor: `${color}80`,
  //       borderWidth: 1,
  //       pointRadius: 2,
  //       hoverRadius: 8,
  //       tension: 0.15,
  //     },
  //   };
  //   setDatasets(updatedDatasets);

  //   if (chartInstance.current) {
  //     if (chartInstance.current.options.scales?.y) {
  //       chartInstance.current.options.scales = {
  //         x: {
  //           type: 'time',
  //           time: {
  //             unit: 'month',
  //             displayFormats: {
  //               month: 'MMM',
  //             },
  //           },
  //         },
  //       };
  //     }

  //     chartInstance.current.data.datasets = Object.values(updatedDatasets);
  //     chartInstance.current.update();
  //   }
  // }, [gameLog, getGames, playerPool, datasets, color, generateColor]);

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
        type: 'scatter',
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
    wrapper: 'relative flex flex-col justify-center w-full py-8 pr-8 pl-4',
    label: 'text-xs text-zinc-400 font-semibold mr-4 mb-2 text-right',
    controls: 'flex gap-x-10 items-start',
  };

  const styles = useStyles(className);
  return (
    <Section size="1" className={styles('wrapper')}>
      <span
        data-hide={Boolean(leagueLeaders?.rowSet?.length)}
        className="absolute z-10 text-[#efefef] text-4xl font-extrabold mb-20 data-[hide=true]:opacity-0 transition-all duration-300 ease-in-out self-center"
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
      {/* <div className={styles('controls')}> */}
      {/* TODO: checkboxes, toggles, other controls... */}
      {/* </div> */}
    </Section>
  );
}
