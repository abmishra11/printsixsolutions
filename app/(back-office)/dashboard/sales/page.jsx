import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
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
    <div>
      {/* Header */}
      {/* <PageHeader
        heading={"Coupons"}
        linkTitle={"Add Coupon"}
        href={"/dashboard/coupons/new"}
      /> */}
      {/* Table */}
      <div className="py-8">
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
    </div>
  );
}
