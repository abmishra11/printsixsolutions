import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { columns } from "./columns";
import React from "react";
import DataTable from "@/components/datatable/DataTable";
import Orders from "@/components/Order/Orders";

export default async function Page() {
  const orders = await getData("orders");

  const filterKeys = [
    { orderNumber: "Order Number" },
    { name: "Name" },
    { email: "Email" },
    { phone: "Phone" },
    { paymentMethod: "Payment Method" },
    { orderStatus: "Order Status" },
  ];
  const tableName = "Orders";
  const exportColumns = [
    { orderNumber: "Order Number" },
    { name: "Name" },
    { email: "Email" },
    { phone: "Contact No" },
    { paymentMethod: "Payment Method" },
    { orderStatus: "Order Status" },
  ];
  return (
    <div className="relative min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-50 mb-4">Orders</h2>
      <DataTable
        tableName={tableName}
        data={orders}
        columns={columns}
        filterKeys={filterKeys}
        exportColumns={exportColumns}
      />
    </div>
  );
}
