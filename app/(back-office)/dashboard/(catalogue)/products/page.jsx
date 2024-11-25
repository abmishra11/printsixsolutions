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

  const products = await getData("products");
  const allProducts = products?.products;

  const vendorId = session?.user?.id;
  const role = session?.user?.role;
  const vendorProducts = allProducts.filter(
    (product) => product.userId === vendorId
  );

  const filterKeys = [
    { title: "Title" },
    { description: "Description" },
    { productPrice: "Price" },
  ];
  const tableName = "Products";
  const exportColumns = [
    { title: "Title" },
    { imageUrl: "Image URL" },
    { description: "Description" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <PageHeader
        heading={"Products"}
        linkTitle={"Add Product"}
        href={"/dashboard/products/new"}
      />
      {/* Table */}
      {role === "ADMIN" ? (
        <DataTable
          tableName={tableName}
          data={allProducts}
          columns={columns}
          filterKeys={filterKeys}
          exportColumns={exportColumns}
        />
      ) : (
        <DataTable
          tableName={tableName}
          data={vendorProducts}
          columns={columns}
          filterKeys={filterKeys}
          exportColumns={exportColumns}
        />
      )}
    </div>
  );
}
