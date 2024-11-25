import { getData } from "@/lib/getData";
import { columns } from "./columns";
import React from "react";
import DataTable from "@/components/datatable/DataTable";

export default async function page() {
  const reviews = await getData("review");

  const filterKeys = [
    { productTitle: "Product Title" },
    { userName: "Customer Name" },
    { userEmail: "Customer Email" },
    { comment: "Review" },
    { rating: "Rating" },
  ];
  const tableName = "Sales";
  const exportColumns = [
    { productImageUrl: "Product Image" },
    { productTitle: "Product Title" },
    { userName: "Customer Name" },
    { userEmail: "Customer Email" },
    { comment: "Review" },
    { rating: "Rating" },
    { isApproved: "Review Status" },
  ];

  return (
    <div className="relative min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-50 mb-4">Reviews</h2>
      <DataTable
        tableName={tableName}
        data={reviews}
        columns={columns}
        filterKeys={filterKeys}
        exportColumns={exportColumns}
      />
    </div>
  );
}
