"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DateColumns from "@/components/DataTableColumns/DateColumns";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import Status from "@/components/DataTableColumns/Status";

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
    header: "Status",
    cell: ({ row }) => <Status row={row} accessorKey="status" />,
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => <DateColumns row={row} accessorKey={"createdAt"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deleteEndPoint = `vendors/${row.original.id}`;
      const editEndPoint = `vendors/update/${row.original.id}`;
      return (
        <ActionColumn
          row={row}
          title={"Vendor"}
          deleteEndPoint={deleteEndPoint}
          editEndPoint={editEndPoint}
        />
      );
    },
  },
];
