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
    accessorKey: "couponCode",
    header: "Coupon Code",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => <DateColumns row={row} accessorKey={"expiryDate"} />,
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => <DateColumns row={row} accessorKey={"createdAt"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deleteEndPoint = `coupons/${row.original.id}`;
      const editEndPoint = `coupons/update/${row.original.id}`;
      return (
        <ActionColumn
          row={row}
          title={"Coupon"}
          deleteEndPoint={deleteEndPoint}
          editEndPoint={editEndPoint}
        />
      );
    },
  },
];
