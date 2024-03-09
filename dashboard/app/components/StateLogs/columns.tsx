'use client';

import { DateTime } from 'luxon';
import { StateMarker } from '@/app/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { STATE_INDICATORS } from '@/app/lib/constants';
import { Button } from '../ui/button';

export const columns: ColumnDef<StateMarker>[] = [
  {
    accessorKey: 'state',
    cell: (cell) => {
      const state = cell.getValue() as keyof typeof STATE_INDICATORS;
      return (
        <span className="flex items-center gap-x-2">
          <span className="text-[8px]">{STATE_INDICATORS[state]}</span>
          {state}
        </span>
      );
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="font-semibold hover:bg-white"
      >
        State
      </Button>
    ),
  },
  {
    accessorKey: 'start',
    accessorFn: (row: { start: number }) =>
      DateTime.fromMillis(row.start).toFormat('hh:mm a'),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 m-0 font-semibold hover:bg-white cursor-text hover:text-zinc-500"
          // TODO: Fix sorting
          // onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start Time
        </Button>
      );
    },
  },
  {
    accessorKey: 'end',
    accessorFn: (row: { end: number }) =>
      DateTime.fromMillis(row.end).toFormat('hh:mm a'),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 m-0 font-semibold hover:bg-white cursor-text hover:text-zinc-500"
          // TODO: Fix sorting
          // onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          End Time
        </Button>
      );
    },
  },
  {
    accessorKey: 'duration',
    accessorFn: (row: { start: number; end: number }) => {
      const start = DateTime.fromMillis(row.start);
      const end = DateTime.fromMillis(row.end);
      const differences = end.diff(start, ['hours', 'minutes']).toObject();
      let duration = '';
      if (differences.hours) {
        duration += `${differences.hours}h `;
      }
      if (differences.minutes) {
        duration += `${differences.minutes}m`;
      }
      return duration;
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 m-0 font-semibold hover:bg-white cursor-text hover:text-zinc-500"
        // TODO: Fix sorting
        // onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Duration
      </Button>
    ),
  },
  {
    accessorKey: 'id',
    header: () => null,
    cell: () => null,
    enableHiding: true,
  },
];
