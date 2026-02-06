"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Sector } from "../types/portfolio";
import { useMemo } from "react";

export default function PortfolioTable({
  sectors
}: {
  sectors: Sector[];
}) {
  const data = useMemo(
    () =>
      sectors.flatMap((sector) =>
        sector.stocksList.map((s) => ({
          ...s,
          sectorName: sector.sectorName
        }))
      ),
    [sectors]
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: "sectorName", header: "Sector" },
      { accessorKey: "name", header: "Stock" },
      { accessorKey: "purchasePrice", header: "Buy Price" },
      { accessorKey: "quantity", header: "Qty" },
      { accessorKey: "investment", header: "Investment" },
      {
        accessorKey: "portfolioPercentage",
        header: "Portfolio %",
        cell: (i) => `${i.getValue<number>().toFixed(2)}%`
      },
      { accessorKey: "exchange", header: "Exchange" },
      { accessorKey: "cmp", header: "CMP", cell: (info) => `₹${info.getValue<number>().toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2})}` },
      { accessorKey: "presentValue", header: "Present Value", cell: (info) => info.getValue<number>().toFixed(2) },
      {
        accessorKey: "gainLoss",
        header: "P/L",
        cell: (i) => (
          <span
            className={
              i.getValue<number>() >= 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {i.getValue<number>().toFixed(2)}
          </span>
        )
      },
      {
        accessorKey: "peRatio",
        header: "P/E",
        cell: (i) => i.getValue<number>() ?? "—"
      }
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-800 text-white">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-2 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" && " ▲"}
                  {header.column.getIsSorted() === "desc" && " ▼"}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t text-center">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
