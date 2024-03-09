'use client';

import { useContext, useEffect } from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';

import { Key, useState } from 'react';
import Pagination from './pagination';
import AppContext from '@/app/context/AppContext';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { selectedRows, setSelectedRows } = useContext(AppContext);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSelect = (row: any) => {
    const id = row.getAllCells().at(-1).getValue();
    const updatedRows = new Set(selectedRows);
    if (updatedRows.has(id)) {
      updatedRows.delete(id);
    } else {
      updatedRows.add(id);
    }
    setSelectedRows(updatedRows);
    row.toggleSelected();
  };

  const rows = table.getRowModel().rows;
  useEffect(() => {
    // Hide the last column (id)
    const allCols = table.getAllColumns();
    allCols.at(-1)?.toggleVisibility(false);
  }, []);

  return (
    <div>
      <div className="rounded-md border mb-2">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map(
                (headerGroup: {
                  id: Key | null | undefined;
                  headers: any[];
                }) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ),
              )}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="data-[state=selected]:bg-zinc-50 border-x-4 data-[state=selected]:border-l-zinc-900 border-x-transparent cursor-pointer"
                onClick={() => handleSelect(row)}
              >
                {row.getVisibleCells().map((cell: ColumnDef<TData>) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className="border-t-0 h-0" />
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
}
