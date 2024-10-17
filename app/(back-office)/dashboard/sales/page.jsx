import React from "react";
import DataTable from "@/components/datatable/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function page() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const role = session?.user?.role;
  const allSales = await getData("sales");

  const vendorSales = allSales.filter((sale) => sale.vendorId === id);
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      {/* <PageHeader
        heading={"Coupons"}
        linkTitle={"Add Coupon"}
        href={"/dashboard/coupons/new"}
      /> */}
      {/* Table */}
      <h2 className="text-2xl font-semibold text-slate-50 mb-4">Sales</h2>
      {role === "ADMIN" ? (
        <DataTable
          data={allSales}
          columns={columns}
          filterKeys={["productTitle"]}
        />
      ) : (
        <DataTable
          data={vendorSales}
          columns={columns}
          filterKeys={["title", "couponCode"]}
        />
      )}
    </div>
  );
}
