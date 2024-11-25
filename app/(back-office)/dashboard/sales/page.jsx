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

  const filterKeys = [{ productTitle: "Product Title" }];
  const tableName = "Sales";
  const exportColumns = [
    { productImage: "Product Image" },
    { productTitle: "Product Title" },
    { productPrice: "Product Price" },
    { productQty: "Quantity" },
    { total: "Total" },
  ];

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
          tableName={tableName}
          data={allSales}
          columns={columns}
          filterKeys={filterKeys}
          exportColumns={exportColumns}
        />
      ) : (
        <DataTable
          tableName={tableName}
          data={vendorSales}
          columns={columns}
          filterKeys={filterKeys}
          exportColumns={exportColumns}
        />
      )}
    </div>
  );
}
