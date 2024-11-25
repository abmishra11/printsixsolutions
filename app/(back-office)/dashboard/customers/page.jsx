import Heading from "@/components/backoffice/Heading";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/datatable/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

export default async function page() {
  const customers = await getData("customers");

  const filterKeys = [{ name: "Name" }, { email: "Email" }];
  const tableName = "Customers";
  const exportColumns = [{ name: "Name" }, { email: "Email" }];

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      {/* <PageHeader
        heading={"Vendors"}
        linkTitle={"Add Vendor"}
        href={"/dashboard/vendors/new"}
      /> */}
      {/* Table */}
      <h2 className="text-2xl font-semibold text-slate-50 mb-4">Customers</h2>
      <DataTable
        tableName={tableName}
        data={customers}
        columns={columns}
        filterKeys={filterKeys}
        exportColumns={exportColumns}
      />
    </div>
  );
}
