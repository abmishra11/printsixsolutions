import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { columns } from "./columns";
import React from "react";
import DataTable from "@/components/datatable/DataTable";
import Orders from "@/components/Order/Orders";

export default async function Page() {
  // Fetch all orders
  const orders = await getData("orders");

  if (orders.length === 0 || !orders) {
    return <p>No Orders Yet</p>;
  }

  return (
    <div className="py-8">
      <DataTable
        data={orders}
        columns={columns}
        filterKeys={["orderNumber", "name", "email", "phone"]}
      />
    </div>
  );
}
