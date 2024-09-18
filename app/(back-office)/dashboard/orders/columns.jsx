"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DateColumns from "@/components/DataTableColumns/DateColumns";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import OrderStatus from "@/components/DataTableColumns/OrderStatus";

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
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Contact No",
  },
  {
    accessorKey: "shippingCost",
    header: "Shipping Cost",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => <OrderStatus row={row} accessorKey="orderStatus" />,
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => <DateColumns row={row} accessorKey={"createdAt"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const viewEndPoint = `orders/${row.original.id}`;
      // const deleteEndPoint = `products/${row.original.id}`;
      // const editEndPoint = `products/update/${row.original.id}`;
      return (
        <ActionColumn
          row={row}
          title={"Order"}
          viewEndPoint={viewEndPoint}
          // deleteEndPoint={deleteEndPoint}
          // editEndPoint={editEndPoint}
        />
      );
    },
  },
];
