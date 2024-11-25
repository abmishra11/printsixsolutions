"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";
import * as XLSX from "xlsx";

export function DataTableToolbar({
  tableName,
  table,
  filterKeys,
  exportColumns,
}) {
  const isFiltered = filterKeys.some((filterKey) => {
    const key = Object.keys(filterKey)[0];
    return table.getState().columnFilters[key]?.length > 0;
  });

  const handleInputChange = (key, value) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const handleResetClick = () => {
    filterKeys.forEach((filterKey) => {
      const key = Object.keys(filterKey)[0];
      table.getColumn(key)?.setFilterValue("");
    });
  };

  const handleExportToExcel = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    // Extract rows from the table with proper column mapping
    const rows = table.getRowModel().rows.map((row) =>
      row.getVisibleCells().reduce((acc, cell) => {
        const column = exportColumns.find(
          (col) => Object.keys(col)[0] === cell.column.id
        );

        if (column) {
          const exportKey = Object.keys(column)[0];
          const exportLabel = column[exportKey];
          acc[exportLabel] = cell.getValue();
        }

        return acc;
      }, {})
    );

    // Ensure rows have valid data
    if (!rows || rows.length === 0) {
      console.error("No data found for export.");
      return;
    }

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Set default zoom level
    worksheet["!sheetViews"] = [
      {
        zoomScale: 100, // Set zoom level to 100%
      },
    ];

    // Auto-adjust column widths
    const maxColumnWidths = rows.reduce((colWidths, row) => {
      Object.keys(row).forEach((col, index) => {
        const valueLength = row[col] ? row[col].toString().length : 10; // Default minimum width
        colWidths[index] = Math.max(colWidths[index] || 0, valueLength);
      });
      return colWidths;
    }, []);

    worksheet["!cols"] = maxColumnWidths.map((width) => ({
      wch: width + 2, // Adjust column width with padding
    }));

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate the file name
    const fileName = `${tableName}_${currentDate}.xlsx`;

    // Export the file
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterKeys.map((filterKey) => {
          const key = Object.keys(filterKey)[0];
          const placeholder = filterKey[key];
          return (
            <Input
              key={key}
              placeholder={`Filter ${placeholder}...`}
              value={table.getColumn(key)?.getFilterValue() ?? ""}
              onChange={(event) => handleInputChange(key, event.target.value)}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          );
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
            aria-label="Reset filters"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="primary"
          onClick={handleExportToExcel}
          className="h-8 px-4"
        >
          Export to Excel
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
