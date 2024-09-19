import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/datatable/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const allProducts = await getData("products");

  const vendorId = session?.user?.id;
  const role = session?.user?.role;
  const vendorProducts = allProducts.filter(
    (product) => product.userId === vendorId
  );

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading={"Products"}
        linkTitle={"Add Product"}
        href={"/dashboard/products/new"}
      />
      {/* Table */}
      <div className="py-8">
        {role === "ADMIN" ? (
          <DataTable data={allProducts} columns={columns} />
        ) : (
          <DataTable data={vendorProducts} columns={columns} />
        )}
      </div>
    </div>
  );
}
