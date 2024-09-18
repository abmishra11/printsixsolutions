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
  const allCoupons = await getData("coupons");
  const vendorCoupons = allCoupons.filter((coupon) => coupon.vendorId === id);
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading={"Coupons"}
        linkTitle={"Add Coupon"}
        href={"/dashboard/coupons/new"}
      />
      {/* Table */}
      <div className="py-8">
        {role === "ADMIN" ? (
          <DataTable
            data={allCoupons}
            columns={columns}
            filterKeys={["title", "couponCode"]}
          />
        ) : (
          <DataTable
            data={vendorCoupons}
            columns={columns}
            filterKeys={["title", "couponCode"]}
          />
        )}
      </div>
    </div>
  );
}
