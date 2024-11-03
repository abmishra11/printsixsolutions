"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DateColumns from "@/components/DataTableColumns/DateColumns";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import OrderStatus from "@/components/DataTableColumns/OrderStatus";
import ReviewStatus from "@/components/DataTableColumns/ReviewStatus";

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
    accessorKey: "productImageUrl",
    header: "Product Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey={"productImageUrl"} />
  },
  {
    accessorKey: "productTitle",
    header: "Product Name",
  },
  {
    accessorKey: "userName",
    header: "Customer Name",
  },
  {
    accessorKey: "userEmail",
    header: "Customer Email",
  },
  {
    accessorKey: "comment",
    header: "Review",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "isApproved",
    header: "Review Status",
    cell: ({ row }) => <ReviewStatus row={row} accessorKey="isApproved" />,
  },
  {
    accessorKey: "createdAt",
    header: "Review Date",
    cell: ({ row }) => <DateColumns row={row} accessorKey={"createdAt"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const viewEndPoint = `reviews/${row.original.id}`;
      // const deleteEndPoint = `products/${row.original.id}`;
      // const editEndPoint = `products/update/${row.original.id}`;
      return (
        <ActionColumn
          row={row}
          title={"Review"}
          viewEndPoint={viewEndPoint}
          // deleteEndPoint={deleteEndPoint}
          // editEndPoint={editEndPoint}
        />
      );
    },
  },
];
