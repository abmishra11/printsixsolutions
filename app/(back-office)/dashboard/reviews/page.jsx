import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { columns } from "./columns";
import React from "react";
import DataTable from "@/components/datatable/DataTable";
import Orders from "@/components/Order/Orders";

export default async function Page() {
  // Fetch all orders
  const reviews = await getData("review");
  console.log("reviews: ", reviews);
  
  if (reviews.length === 0 || !reviews) {
    return <p>No Review Yet</p>;
  }

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
