"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DateColumns from "@/components/DataTableColumns/DateColumns";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title={"Name"} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title={"Email"} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableColumn column={column} title={"Status"} />,
  },
  {
    accessorKey: "createdAt",
    header: "Registered Date",
    cell: ({ row }) => <DateColumns row={row} accessorKey={"createdAt"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      const deleteEndPoint = `customers/${customer.id}`;
      const editEndPoint = `customers/update/${customer.id}`;
      const statusChangeEndPoint = `customers/status/${customer.id}`;
      const status = customer.status;
      return (
        <ActionColumn
          row={row}
          title={"Customer"}
          status={status}
          statusChangeEndPoint={statusChangeEndPoint}
          deleteEndPoint={deleteEndPoint}
          editEndPoint={editEndPoint}
        />
      );
    },
  },
];
