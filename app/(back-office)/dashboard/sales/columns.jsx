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
    accessorKey: "productImage",
    header: "Product Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey={"productImage"} />,
  },
  {
    accessorKey: "productTitle",
    header: ({ column }) => (
      <SortableColumn column={column} title={"Product Title"} />
    ),
  },
  {
    accessorKey: "productPrice",
    header: "Product Price",
  },
  {
    accessorKey: "productQty",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => <DateColumns row={row} accessorKey={"createdAt"} />,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const deleteEndPoint = `products/${row.original.id}`;
  //     const editEndPoint = `products/update/${row.original.id}`;
  //     return (
  //       <ActionColumn
  //         row={row}
  //         title={"Product"}
  //         deleteEndPoint={deleteEndPoint}
  //         editEndPoint={editEndPoint}
  //       />
  //     );
  //   },
  // },
];
