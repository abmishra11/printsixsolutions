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
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title={"Title"} />,
  },
  {
    accessorKey: "imageUrl",
    header: "Banner Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey={"imageUrl"} />,
  },
  {
    accessorKey: "link",
    header: "Banner Link",
  },
  {
    accessorKey: "isActive",
    header: "IsActive",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => <DateColumns row={row} accessorKey={"createdAt"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deleteEndPoint = `banners/${row.original.id}`;
      const editEndPoint = `banners/update/${row.original.id}`;
      return (
        <ActionColumn
          row={row}
          title={"Banner"}
          deleteEndPoint={deleteEndPoint}
          editEndPoint={editEndPoint}
        />
      );
    },
  },
];
