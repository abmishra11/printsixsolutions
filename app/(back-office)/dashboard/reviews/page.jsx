import { getData } from "@/lib/getData";
import { columns } from "./columns";
import React from "react";
import DataTable from "@/components/datatable/DataTable";

export default async function page() {
  const reviews = await getData("review");
  console.log("reviews", reviews);
  
  return (
    <div className="relative min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-50 mb-4">Reviews</h2>
      <DataTable
        data={reviews}
        columns={columns}
        filterKeys={["productTitle", "userName", "userEmail", "rating"]}
      />
    </div>
  );
}
